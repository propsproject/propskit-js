const _ = require('lodash');
const { createContext, CryptoFactory } = require('sawtooth-sdk/signing');
const { Secp256k1PrivateKey } = require('sawtooth-sdk/signing/secp256k1');
const { Signer } = require('sawtooth-sdk/signing/');
const rp = require('request-promise');
// const cbor = require('cbor');
const { protobuf } = require('sawtooth-sdk');
// const proto = require('google-protobuf');
const any = require('google-protobuf/google/protobuf/any_pb.js');
const payloads_pb = require('./proto/payload/payload_pb');
const earnings_pb = require('./proto/earning/earning_pb');
const ethUtil = require('ethereumjs-util');
// const BigNumber = require('bignumber.js');
const { createHash } = require('crypto');
import { Signer } from 'crypto';
import TransactionManagerOptions from './transaction_manager_options';
import IssuePayload from './payloads/issue_payload';
import SettlePayload from './payloads/settle_payload';

interface SubmitAPIResponse {
  batch_status_uri: string;   
  batch_id: string; 
}

interface StatusAPIResponse {
  batch_id: string;    
  status: string;
}

interface BatchDetailsTransaction {
  trasnaction_id: string;
  state_address: string;
}

interface LogFunction {
  (msg: string, topic: string, owner: string, appLevel: number, primaryId: number, secondaryId: number, extraObj: any, err: Error, url: string): any;
}

class TransactionManager {  
  ctx;
  private_key;
  crypto_factory;
  signer;
  last_error: Error;
  last_state_data: string[];
  last_submit_response: SubmitAPIResponse;
  last_status_response: StatusAPIResponse[];
  revoked_addresses: any;
  
  app_addr: string;
  request_timestamp: number;

  log; // log function
  options: TransactionManagerOptions;
  prefixes: any; // prefixes for earning addresses
 
  constructor(appPrivateKey: string, options: TransactionManagerOptions, logFunction: LogFunction = null) {    
    this.ctx = createContext('secp256k1');
    this.crypto_factory = new CryptoFactory(this.ctx);    
    this.private_key = Secp256k1PrivateKey.fromHex(appPrivateKey);
    this.signer = this.crypto_factory.newSigner(this.private_key);
    this.app_addr = ethUtil.pubToAddress(this.signer.getPublicKey().asBytes(), true).toString('hex');    
    this.log = logFunction === null ? (msg: string, topic: string, owner: string, appLevel: number, primaryId: number, secondaryId: number, extraObj: any, err: Error, url: string) => { 
      console.log(`${msg}|${topic}|${owner}|${appLevel}|${primaryId}|${secondaryId}|${JSON.stringify(extraObj)}|${JSON.stringify(err)}|${url}`); 
    } : logFunction;
    this.options = options;
    this.prefixes = {
      pending: createHash('sha512').update('pending-props:earnings:pending').digest('hex').substring(0, 6),
      revoked: createHash('sha512').update('pending-props:earnings:revoked').digest('hex').substring(0, 6),
      settled: createHash('sha512').update('pending-props:earnings:settled').digest('hex').substring(0, 6),
      settlements: createHash('sha512').update('pending-props:earnings:settlements').digest('hex').substring(0, 6),
      balance: createHash('sha512').update('pending-props:earnings:balance').digest('hex').substring(0, 6),
      balanceTimestamp: createHash('sha512').update('pending-props:earnings:bal-ts').digest('hex').substring(0, 6),
    };
    this.revoked_addresses = {};
  }

  public async submitRevokeTransaction(stateAddresses:string[], recipient: string):Promise<boolean> {
    
    const transactions = [];
    for (let i = 0; i < stateAddresses.length; i += 1) {  
      transactions.push(this.getRevokeTransaction(stateAddresses[i],recipient));
    }
    const batch = this.getBatch(transactions);    
    return this.makeSubmitAPIRequest(batch);
  }

  public async submitIssueTransaction(issuePayloads:IssuePayload[], timestamp: number):Promise<boolean> {
    this.request_timestamp = timestamp;
    const transactions = [];
    for (let i = 0; i < issuePayloads.length; i += 1) {  
      transactions.push(this.getIssueTransaction(this.getIssueEarningDetailsPB(issuePayloads[i])));
    }
    const batch = this.getBatch(transactions);    
    return this.makeSubmitAPIRequest(batch);
  }

  public async statusLookup(batch_uri: string): Promise<boolean> {
    return this.makeStatusAPIRequest(batch_uri);
  }

  public async addressLookup(address: string): Promise<any> {
    const res: boolean = await this.makeAddressAPIRequest(address);
    if (res) {
      return this.last_state_data;
    } else {
      return false;
    }
  }

  public async batchLookup(batch_id: string): Promise<BatchDetailsTransaction[]> {
    const resObj =  await this.makeBatchDetailsAPIRequest(batch_id);
    if (resObj === false) {
      throw this.last_error;
    }
    const transactionsData: BatchDetailsTransaction[] = [];
    for (let i = 0; i < resObj.data.transactions.length; i += 1) {  
      transactionsData[resObj.data.transactions[i].header.inputs[0]] = { trasnaction_id: resObj.data.transactions[i].header_signature, state_address: resObj.data.transactions[i].header.inputs[0] };
    }
    return transactionsData;
  }

  private async makeBatchDetailsAPIRequest(batch_id: string) {
    const options = {
      method: 'GET',
      uri: this.options.batchesUrl() + '/' + batch_id,      
    };    
    try {
      const resStr = await rp(options);
      return JSON.parse(resStr);
      
    } catch (error) {
      this.log(`error=${error.message}`, 'TRANSACTION_MANAGER_API_ERROR', 'jon', 0, 0, 0, options, error);
      this.last_error = error;
      return false;
    }    
  }
  
  private async makeAddressAPIRequest(address: string): Promise<boolean> {
    const options = {
      method: 'GET',
      uri: this.options.stateUrl(address),
    };    
    try {
      const resStr = await rp(options);
      const res = JSON.parse(resStr);
      const data = res.data;
      let ret;
      data.forEach((element) => {
        const bytes = new Uint8Array(Buffer.from(element.data, 'base64'));
        const earning = new earnings_pb.Earning.deserializeBinary(bytes);
        ret = (earning.toObject()).details;
      });
      this.last_state_data = ret;
      return true;
    } catch (error) {
      this.log(`error=${error.message}`, 'TRANSACTION_MANAGER_API_ERROR', 'jon', 0, 0, 0, options, error);
      this.last_error = error;
      return false;
    }    
  }

  private async makeStatusAPIRequest(batch_uri: string): Promise<boolean> {
    const options = {
      method: 'GET',
      uri: batch_uri,      
    };    
    try {
      const resStr = await rp(options);
      const res = JSON.parse(resStr);
      this.last_status_response = res.data;
      return true;
    } catch (error) {
      this.log(`error=${error.message}`, 'TRANSACTION_MANAGER_API_ERROR', 'jon', 0, 0, 0, options, error);
      this.last_error = error;
      return false;
    }    
  }

  private async makeSubmitAPIRequest(batch): Promise<boolean> {
    const batchListBytes = protobuf.BatchList.encode({
          batches: [batch],
      }).finish();    
    const options = {
      method: 'POST',
      uri: this.options.batchesUrl(),
      body: batchListBytes,
      // json: true, 
      headers: { 'Content-Type': 'application/octet-stream' },
    };    
    try {
      const res = JSON.parse(await rp(options));    
      const resLinkSplit = res.link.split('=');  
      this.last_submit_response = { batch_status_uri: res.link, batch_id: resLinkSplit[1] };                
      return true;
    } catch (error) {
      this.log(`error=${error.message}`, 'TRANSACTION_MANAGER_API_ERROR', 'jon', 0, 0, 0, options, error);
      this.last_error = error;
      return false;
    }    
  }
  private getBatch(transactions) {
    // prepare transactions batch
    const batchHeaderBytes = protobuf.BatchHeader.encode({
        signerPublicKey: this.getPublicKey(),
        transactionIds: transactions.map(txn => txn.headerSignature),
    }).finish();    
    const signature = this.signer.sign(batchHeaderBytes);    
    const batch = protobuf.Batch.create({
      header: batchHeaderBytes,
      headerSignature: signature,
      transactions,
    });    
    return batch;
    
  }

  // private getStateAddress(recipient, application, signature): string {
  //   const prefix: string = createHash('sha512').update(this.options.earning_prefix).digest('hex').substring(0, 6);
  //   const recID: string = createHash('sha512').update(recipient).digest('hex').substring(0, 4);
  //   const appID: string = createHash('sha512').update(application).digest('hex').substring(0, 4);
  //   const postfix: string = createHash('sha512').update(`${recipient}${application}${signature}`).digest('hex').toLowerCase().substring(0, 56);
  //   return `${prefix}${recID}${appID}${postfix}`;
  // }
  public getEarningStateAddress(status: string, args: any): string {
    const prefix: string = this.prefixes[status];
    let address: string = prefix;
    args.forEach((a) => {
      address = address.concat(createHash('sha512').update(`${a.data}`).digest('hex').substring(a.start, a.end));
    });
    return address;
  }

  public getBalanceStateAddress(recipientAddress: string): string {
    const prefix: string = this.prefixes['balance'];
    const recipient = this.stripWalletPrefix(recipientAddress);
    const postfix: string = createHash('sha512').update(`${recipient}`).digest('hex').toLowerCase().substring(0,64);
    return `${prefix}${postfix}`;
  }

  public getBalanceTimestateAddressPrefix(recipientAddress: string): string {
    const prefix: string = this.prefixes['balanceTimestamp'];
    const recipient = this.stripWalletPrefix(recipientAddress);
    const postfix: string = createHash('sha512').update(`${recipient}`).digest('hex').toLowerCase().substring(0,54);
    return `${prefix}${postfix}`;
  }

  private getRPCRequest(params, method) {
    const reqParams = new payloads_pb.Params();    
    reqParams.setData(params);
    const payload = new payloads_pb.RPCRequest();
    payload.setMethod(method);
    payload.setParams(reqParams);
    return payload;
  }

  private stripWalletPrefix(str: string): string {
    return str.substr(0,2) === '0x' ? str.substr(2) : str; 
  }

  private getIssueEarningDetailsPB(payload: IssuePayload, timestamp: number = 0) {
    const details = new earnings_pb.EarningDetails();
    details.setTimestamp('timestamp' in payload ? payload.timestamp : (timestamp > 0 ? timestamp : this.request_timestamp));
    details.setRecipientPublicAddress(this.stripWalletPrefix(payload.wallet));
    details.setAmountEarned(payload.amount);
    details.setAmountSettled(0.0);
    details.setApplicationPublicAddress(this.app_addr);    
    return details;
  }

  public getIssueStateAddress(payload: IssuePayload, timestamp: number): string {
    const issueEarningsDetailsPB = this.getIssueEarningDetailsPB(payload, 'timestamp' in payload ? payload.timestamp : timestamp);
    const hashToSign = createHash('sha512').update(issueEarningsDetailsPB.serializeBinary()).digest('hex').toLowerCase();    
    const earningsSignature = this.signer.sign(Buffer.from(hashToSign));
    const addressArgs = [
      { data: issueEarningsDetailsPB.getRecipientPublicAddress(), start: 0, end: 4 },
      { data: issueEarningsDetailsPB.getApplicationPublicAddress(), start: 0, end: 4 },
      { data: `${issueEarningsDetailsPB.getRecipientPublicAddress()}${this.app_addr}${earningsSignature}`, start: 0, end: 56 },
    ];
    // console.log(JSON.stringify(addressArgs));
    return this.getEarningStateAddress('pending', addressArgs);    
  }

  public getSettleStateAddress(payload: SettlePayload, timestamp: number): string {
    const issueEarningsDetailsPB = this.getIssueEarningDetailsPB(payload, 'timestamp' in payload ? payload.timestamp : timestamp);
    const hashToSign = createHash('sha512').update(issueEarningsDetailsPB.serializeBinary()).digest('hex').toLowerCase();
    const earningsSignature = this.signer.sign(Buffer.from(hashToSign));
    const addressArgs = [
      { data: issueEarningsDetailsPB.getRecipientPublicAddress(), start: 0, end: 4 },
      { data: issueEarningsDetailsPB.getApplicationPublicAddress(), start: 0, end: 4 },
      { data: `${issueEarningsDetailsPB.getRecipientPublicAddress()}${this.app_addr}${earningsSignature}`, start: 0, end: 56 },
    ];
    // console.log(JSON.stringify(addressArgs));
    return this.getEarningStateAddress('settled', addressArgs);
  }

  private getIssueTransaction(issueEarningsDetailsPB: any) {
    // prepare transaction
    const hashToSign = createHash('sha512').update(issueEarningsDetailsPB.serializeBinary()).digest('hex').toLowerCase();    
    const earningsSignature = this.signer.sign(Buffer.from(hashToSign));
    const earning = new earnings_pb.Earning();
    earning.setDetails(issueEarningsDetailsPB);
    earning.setSignature(earningsSignature);    
    const params = new any.Any();
    params.setValue(earning.serializeBinary());
    params.setTypeUrl('github.com/propsproject/pending-props/protos/pending_props_pb.Earning');
    const rpcRequest = this.getRPCRequest(params, payloads_pb.Method.ISSUE);
    const rpcRequestBytes = rpcRequest.serializeBinary();
    const addressArgs = [
      { data: issueEarningsDetailsPB.getRecipientPublicAddress(), start: 0, end: 4 },
      { data: issueEarningsDetailsPB.getApplicationPublicAddress(), start: 0, end: 4 },
      { data: `${issueEarningsDetailsPB.getRecipientPublicAddress()}${this.app_addr}${earningsSignature}`, start: 0, end: 56 },
    ];
    // console.log("*************************"+JSON.stringify(addressArgs));
    // const stateAddress = this.getStateAddress(issueEarningsDetailsPB.getRecipientPublicAddress(), issueEarningsDetailsPB.getApplicationPublicAddress(), earningsSignature);    
    const stateAddress = this.getEarningStateAddress('pending', addressArgs);
    const balanceAddress = this.getBalanceStateAddress(issueEarningsDetailsPB.getRecipientPublicAddress());
    const balanceTimestampAddress = this.getBalanceTimestateAddressPrefix(issueEarningsDetailsPB.getRecipientPublicAddress());
    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
        familyName: this.options.family_name,
        familyVersion: this.options.family_version,
        inputs: [balanceAddress, stateAddress],
        outputs: [balanceAddress, balanceTimestampAddress, stateAddress],
        signerPublicKey: this.getPublicKey(),
        batcherPublicKey: this.getPublicKey(),
        dependencies: [],
        payloadSha512: createHash('sha512').update(rpcRequestBytes).digest('hex'),
    }).finish();
    const signature = this.signer.sign(transactionHeaderBytes);    
    const tx =  protobuf.Transaction.create({
      header: transactionHeaderBytes,
      headerSignature: signature,
      payload: rpcRequestBytes,
    });    
    return tx;
  }

  private getRevokeTransaction(stateAddress: string, recipient: string) {
    // prepare transaction
    // const hashToSign = createHash('sha512').update(issueEarningsDetailsPB.serializeBinary()).digest('hex').toLowerCase();    
    // const earningsSignature = this.signer.sign(Buffer.from(hashToSign));
    // const earning = new earnings_pb.Earning();
    // earning.setDetails(issueEarningsDetailsPB);
    // earning.setSignature(earningsSignature);    
    // const msg = createHash("sha512").update("fsafdas").digest('hex');
    const stateAddresses: string[] = [stateAddress];
    const paramData = JSON.stringify({ addresses: stateAddresses });
    const params = new any.Any();
    params.setValue(Buffer.from(paramData));    
    const rpcRequest = this.getRPCRequest(params, payloads_pb.Method.REVOKE);
    const rpcRequestBytes = rpcRequest.serializeBinary();
    const revokeAddresses: string[] = [];
    stateAddresses.forEach((address) => {
      const revokeAddress:string = `${this.prefixes.revoked}${address.substring(6)}`;
      revokeAddresses.push(revokeAddress);
      this.revoked_addresses[address] = revokeAddress;
    });
    const balanceAddress = this.getBalanceStateAddress(recipient);
    const balanceTimestampAddress = this.getBalanceTimestateAddressPrefix(recipient);
    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
        familyName: this.options.family_name,
        familyVersion: this.options.family_version,
        inputs: [balanceAddress, ...stateAddresses, ...revokeAddresses],
        outputs: [balanceAddress, balanceTimestampAddress, ...stateAddresses, ...revokeAddresses],
        signerPublicKey: this.getPublicKey(),
        batcherPublicKey: this.getPublicKey(),
        dependencies: [],
        payloadSha512: createHash('sha512').update(rpcRequestBytes).digest('hex'),
    }).finish();
    const signature = this.signer.sign(transactionHeaderBytes);    
    const tx =  protobuf.Transaction.create({
      header: transactionHeaderBytes,
      headerSignature: signature,
      payload: rpcRequestBytes,
    });    
    return tx;
  }
  
  getPrivateKey(): string {
    return this.private_key.asHex();
  }

  getPublicKey(): string {
    return this.signer.getPublicKey().asHex();
  }

  getSubmitResponse(): SubmitAPIResponse {
    return this.last_submit_response;
  }


  
}

export { TransactionManager, SubmitAPIResponse, BatchDetailsTransaction, LogFunction };
