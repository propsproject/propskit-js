const _ = require('lodash');
const { createContext, CryptoFactory } = require('sawtooth-sdk/signing');
const { Secp256k1PrivateKey } = require('sawtooth-sdk/signing/secp256k1');
const rp = require('request-promise');
const { protobuf } = require('sawtooth-sdk');
const any = require('google-protobuf/google/protobuf/any_pb.js');
const payloads_pb = require('./proto/payload_pb');
const balance_pb = require('./proto/balance_pb');
const earnings_pb = require('./proto/earning_pb');
const ethUtil = require('ethereumjs-util');
const { createHash } = require('crypto');
const moment = require('moment');
const BigNumber = require('bignumber.js');

import IssuePayload from './payloads/issue_payload';
import SettlePayload from './payloads/settle_payload';
import { Balance } from './proto/balance_pb';
import { LastEthBlock } from './proto/earning_pb';

interface SubmitAPIResponse {
  batchStatusUri: string;
  batchId: string;
}

interface StatusAPIResponse {
  batchId: string;
  status: string;
}

interface BatchDetailsTransaction {
  transactionId: string;
  stateAddress: string;
}

interface WalletBalance {
  pending: string; // bigNumber
  total: string; // bigNumber
  timestamp: number;
  wallet: string;
}

interface BalanceUpdate {
  recipient: string;
  recipientBalance: string;
  from: string;
  fromBalance: string;
  txHash: string;
  blockId: number;
  timestamp: number;  
}

interface TransactionManagerOptions {
  familyName: string;
  familyVersion: string;
  https?: boolean;
  host?: string;
  port?: number;
}

let instance = null;

class TransactionManager {
  familyName: string;
  familyVersion: string;
  https: boolean;
  host: string;
  port: number;

  lastStateData: string[];
  revokedAddresses: any;
  requestTimestamp: number;

  lastSubmitResponse: SubmitAPIResponse;
  lastStatusResponse: StatusAPIResponse[];

  prefixes;

  static getInstance(args: TransactionManagerOptions) {
    if (_.isNull(instance)) {
      instance = new TransactionManager(args);
    }

    return instance;
  }
 
  constructor(options: TransactionManagerOptions) {
    this.familyName = options.familyName;
    this.familyVersion = options.familyVersion;
    this.https = !_.isUndefined(options.https);
    this.host = _.isUndefined(options.host) ? '127.0.0.1' : options.host;
    this.port = _.isUndefined(options.port) ? 8008 : options.port;

    this.revokedAddresses = {};
    this.prefixes = {
      pending: createHash('sha512').update('pending-props:earnings:pending').digest('hex').substring(0, 6),
      revoked: createHash('sha512').update('pending-props:earnings:revoked').digest('hex').substring(0, 6),
      settled: createHash('sha512').update('pending-props:earnings:settled').digest('hex').substring(0, 6),
      settlements: createHash('sha512').update('pending-props:earnings:settlements').digest('hex').substring(0, 6),
      balance: createHash('sha512').update('pending-props:earnings:balance').digest('hex').substring(0, 6),
      balanceTimestamp: createHash('sha512').update('pending-props:earnings:bal-ts').digest('hex').substring(0, 6),
      balanceUpdate: createHash('sha512').update('pending-props:earnings:bal-trx').digest('hex').substring(0, 6),
      blockIdUpdate: createHash('sha512').update('pending-props:earnings:lastethblock').digest('hex').substring(0, 6),
    };
  }

  httpPrefix(): string {
    return this.https ? 'https://' : 'http://';
  }

  batchesUrl(): string {
    return this.httpPrefix() + this.host + ':' + this.port + '/batches';
  }

  stateAddressUrl(stateAddress: string) {
    return this.httpPrefix() + this.host + ':' + this.port + '/state?address=' + stateAddress;
  }

  static normalizeWalletAddress(walletAddress: string): string {
    const strippedWalletAddress = walletAddress.substr(0,2) === '0x' ? walletAddress.substr(2) : walletAddress;
    return _.toUpper(strippedWalletAddress);
  }

  static getSigner(privateKey) {
    const ctx = createContext('secp256k1');
    const cryptoFactory = new CryptoFactory(ctx);
    return cryptoFactory.newSigner(Secp256k1PrivateKey.fromHex(privateKey));
  }

  static getAppAddress(privateKey) {
    const signer = TransactionManager.getSigner(privateKey);
    return ethUtil.pubToAddress(signer.getPublicKey().asBytes(), true).toString('hex');
  }

  async getLatestEthBlockId(): Promise<number> {
    const lastEthBlockIdAddress: string = this.getLastEthBlockStateAddress();
    const options = {
      method: 'GET',
      uri: this.stateAddressUrl(lastEthBlockIdAddress),
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = JSON.parse(await rp(options));    
      const data = res.data;
      let blockId = null;

      data.forEach((entry) => {
        const bytes = new Uint8Array(Buffer.from(entry.data, 'base64'));
        // const balance: Balance = new balance_pb.Balance.deserializeBinary(bytes);
        const block: LastEthBlock = new earnings_pb.LastEthBlock.deserializeBinary(bytes);
        blockId = block.getId();        
      });

      return blockId;
    } catch (error) {
      throw error;
    }
  }

  async getBalanceByWallet(wallet: string): Promise<WalletBalance> {
    const balanceAddress: string = this.getBalanceStateAddress(wallet);
    const options = {
      method: 'GET',
      uri: this.stateAddressUrl(balanceAddress),
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = JSON.parse(await rp(options));    
      const data = res.data;
      let walletBalance = null;

      data.forEach((entry) => {
        const bytes = new Uint8Array(Buffer.from(entry.data, 'base64'));
        const balance: Balance = new balance_pb.Balance.deserializeBinary(bytes);

        walletBalance = {
          pending: balance.getPending(),
          total: balance.getTotal(),
          timestamp: balance.getLastTimestamp(),
          wallet,
        };
      });

      return walletBalance;
    } catch (error) {
      throw error;
    }
  }

  public async submitRevokeTransaction(privateKey, stateAddresses:string[], recipient: string):Promise<boolean> {
    const transactions = [];
    const balanceAddress: string = this.getBalanceStateAddress(recipient);
    const balanceTimestampAddressPrefix: string = this.getBalanceTimestateAddressPrefix(recipient);

    for (let i = 0; i < stateAddresses.length; i += 1) {
      transactions.push(this.getRevokeTransaction(privateKey, stateAddresses[i],[balanceAddress, balanceTimestampAddressPrefix]));
    }

    const batch = this.getBatch(privateKey, transactions);
    return this.makeSubmitAPIRequest(batch);
  }

  public async submitBalanceUpdateTransaction(privateKey, recipient: string, recipientBalance: string, from: string, fromBalance:string, txHash: string, blockId: number, timestamp: number):Promise<boolean> {
    const transactions = [];
    const recipientBalanceAddress: string = this.getBalanceStateAddress(recipient);
    const recipientBalanceTimestampAddressPrefix: string = this.getBalanceTimestateAddressPrefix(recipient);
    const fromBalanceAddress: string = this.getBalanceStateAddress(from);
    const fromBalanceTimestampAddressPrefix: string = this.getBalanceTimestateAddressPrefix(from);
    const balanceUpdateAddress: string = this.getBalanceUpdateAddress(txHash);
    const balanceUpdateData: BalanceUpdate = {
      recipient,
      recipientBalance,
      from,
      fromBalance,
      txHash,
      blockId,
      timestamp,
    };
    transactions.push(this.getBalanceUpdateTransaction(privateKey, balanceUpdateData,[recipientBalanceAddress, recipientBalanceTimestampAddressPrefix, fromBalanceAddress, fromBalanceTimestampAddressPrefix, balanceUpdateAddress]));    

    const batch = this.getBatch(privateKey, transactions);
    return this.makeSubmitAPIRequest(batch);
  }

  public async submitIssueTransaction(privateKey, issuePayloads:IssuePayload[], timestamp: number):Promise<boolean> {
    this.requestTimestamp = timestamp;
    const transactions = [];

    for (let i = 0; i < issuePayloads.length; i += 1) {  
      transactions.push(this.getIssueTransaction(privateKey, this.getIssueEarningDetailsPB(privateKey, issuePayloads[i])));
    }

    const batch = this.getBatch(privateKey, transactions);
    return this.makeSubmitAPIRequest(batch);
  }

  public async submitNewEthBlockIdTransaction(privateKey, blockId: number): Promise<boolean> {
    const transactions = [];
    transactions.push(this.getLastEthBlockTransaction(privateKey, blockId));
    const batch = this.getBatch(privateKey, transactions);
    return this.makeSubmitAPIRequest(batch);
  }

  public async statusLookup(batchUri: string): Promise<boolean> {
    return this.makeStatusAPIRequest(batchUri);
  }

  public async addressLookup(address: string, type: string = 'EARNING'): Promise<any> {
    const res: boolean = await this.makeAddressAPIRequest(address, type);

    if (res) {
      return this.lastStateData;
    } else {
      return false;
    }
  }

  public async batchLookup(batchId: string): Promise<BatchDetailsTransaction[]> {
    const resObj =  await this.makeBatchDetailsAPIRequest(batchId);
    const transactionsData: BatchDetailsTransaction[] = [];

    for (let i = 0; i < resObj.data.transactions.length; i += 1) {
      for (let j = 0; j < resObj.data.transactions[i].header.inputs.length; j += 1) {
        transactionsData[resObj.data.transactions[i].header.inputs[j]] = { transactionId: resObj.data.transactions[i].header_signature, stateAddress: resObj.data.transactions[i].header.inputs[j] };
      }
    }

    return transactionsData;
  }

  private async makeBatchDetailsAPIRequest(batchId: string) {
    const options = {
      method: 'GET',
      uri: this.batchesUrl() + '/' + batchId,
    };

    try {
      const resStr = await rp(options);
      return JSON.parse(resStr);
    } catch (error) {
      throw error;
    }    
  }
  
  private async makeAddressAPIRequest(stateAddress: string, type: string): Promise<boolean> {
    const options = {
      method: 'GET',
      uri: this.stateAddressUrl(stateAddress),
    };

    try {
      const resStr = await rp(options);
      const res = JSON.parse(resStr);
      const data = res.data;
      let ret;
      let dataObject;
      data.forEach((element) => {
        const bytes = new Uint8Array(Buffer.from(element.data, 'base64'));
        switch (type) {
          case 'EARNING':
            dataObject = new earnings_pb.Earning.deserializeBinary(bytes);
            ret = (dataObject.toObject()).details;
            break;
          case 'LASTETHBLOCK':
            dataObject = new earnings_pb.LastEthBlock.deserializeBinary(bytes);
            ret = (dataObject.toObject());
            break;
          case 'BALANCE':
            dataObject = new balance_pb.Balance.deserializeBinary(bytes);
            ret = (dataObject.toObject());
            break;  
        }         
      });

      this.lastStateData = ret;
      return true;
    } catch (error) {
      throw error;
    }    
  }

  private async makeStatusAPIRequest(batchUri: string): Promise<boolean> {
    const options = {
      method: 'GET',
      uri: batchUri,
    };

    try {
      const resStr = await rp(options);
      const res = JSON.parse(resStr);
      this.lastStatusResponse = res.data;
      return true;
    } catch (error) {
      throw error;
    }    
  }

  private async makeSubmitAPIRequest(batch): Promise<boolean> {
    const batchListBytes = protobuf.BatchList.encode({
          batches: [batch],
      }).finish();

    const options = {
      method: 'POST',
      uri: this.batchesUrl(),
      body: batchListBytes,
      headers: { 'Content-Type': 'application/octet-stream' },
    };

    try {
      const res = JSON.parse(await rp(options));    
      const resLinkSplit = res.link.split('=');  
      this.lastSubmitResponse = { batchStatusUri: res.link, batchId: resLinkSplit[1] };
      return true;
    } catch (error) {
      throw error;
    }    
  }

  private getBatch(privateKey, transactions) {
    // prepare transactions batch
    const batchHeaderBytes = protobuf.BatchHeader.encode({
        signerPublicKey: TransactionManager.getPublicKey(privateKey),
        transactionIds: transactions.map(txn => txn.headerSignature),
    }).finish();

    const signature = TransactionManager.getSigner(privateKey).sign(batchHeaderBytes);
    const batch = protobuf.Batch.create({
      header: batchHeaderBytes,
      headerSignature: signature,
      transactions,
    });

    return batch;
  }

  public getEarningStateAddress(status: string, args: any): string {
    let address = this.prefixes[status];

    args.forEach((a) => {
      address = address.concat(createHash('sha512').update(`${a.data}`).digest('hex').substring(a.start, a.end));
    });

    return address;
  }

  public getBalanceStateAddress(recipientAddress: string): string {
    const prefix: string = this.prefixes['balance'];
    const recipient = TransactionManager.normalizeWalletAddress(recipientAddress);
    const postfix: string = createHash('sha512').update(`${recipient}`).digest('hex').toLowerCase().substring(0,64);

    return `${prefix}${postfix}`;
  }

  public getBalanceUpdateAddress(txHash: string): string {
    const prefix: string = this.prefixes['balanceUpdate'];    
    const postfix: string = createHash('sha512').update(`${txHash}`).digest('hex').toLowerCase().substring(0,64);

    return `${prefix}${postfix}`;
  }

  public getLastEthBlockStateAddress(): string {
    const prefix: string = this.prefixes['blockIdUpdate'];    
    const postfix: string = createHash('sha512').update('0').digest('hex').toLowerCase().substring(0,64);

    return `${prefix}${postfix}`;
  }

  public getBalanceTimestateAddressPrefix(recipientAddress: string): string {
    const prefix: string = this.prefixes['balanceTimestamp'];
    const recipient = TransactionManager.normalizeWalletAddress(recipientAddress);
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

  private getIssueEarningDetailsPB(privateKey, payload: IssuePayload, timestamp: number = 0) {
    const details = new earnings_pb.EarningDetails();
    details.setTimestamp('timestamp' in payload ? payload.timestamp : (timestamp > 0 ? timestamp : this.requestTimestamp));
    details.setRecipientPublicAddress(TransactionManager.normalizeWalletAddress(payload.wallet));
    BigNumber.set({ EXPONENTIAL_AT: 1e+9 });
    const propsAmount = new BigNumber(payload.amount, 10);
    const tokensAmount = propsAmount.times(1e18);
    const zero = new BigNumber(0, 10);
    details.setAmountEarned(tokensAmount.toString());
    details.setAmountSettled(zero.toString());
    details.setApplicationPublicAddress(TransactionManager.getAppAddress(privateKey));

    return details;
  }

  public getIssueStateAddress(privateKey, payload: IssuePayload, timestamp: number): string {
    const issueEarningsDetailsPB = this.getIssueEarningDetailsPB(privateKey, payload, 'timestamp' in payload ? payload.timestamp : timestamp);
    const hashToSign = createHash('sha512').update(issueEarningsDetailsPB.serializeBinary()).digest('hex').toLowerCase();    
    const earningsSignature = TransactionManager.getSigner(privateKey).sign(Buffer.from(hashToSign));

    const addressArgs = [
      { data: issueEarningsDetailsPB.getRecipientPublicAddress(), start: 0, end: 4 },
      { data: issueEarningsDetailsPB.getApplicationPublicAddress(), start: 0, end: 4 },
      { data: `${issueEarningsDetailsPB.getRecipientPublicAddress()}${TransactionManager.getAppAddress(privateKey)}${earningsSignature}`, start: 0, end: 56 },
    ];

    return this.getEarningStateAddress('pending', addressArgs);    
  }

  public getSettleStateAddress(privateKey, payload: SettlePayload, timestamp: number): string {
    const issueEarningsDetailsPB = this.getIssueEarningDetailsPB(privateKey, payload, 'timestamp' in payload ? payload.timestamp : timestamp);
    const hashToSign = createHash('sha512').update(issueEarningsDetailsPB.serializeBinary()).digest('hex').toLowerCase();
    const earningsSignature = TransactionManager.getSigner(privateKey).sign(Buffer.from(hashToSign));

    const addressArgs = [
      { data: issueEarningsDetailsPB.getRecipientPublicAddress(), start: 0, end: 4 },
      { data: issueEarningsDetailsPB.getApplicationPublicAddress(), start: 0, end: 4 },
      { data: `${issueEarningsDetailsPB.getRecipientPublicAddress()}${TransactionManager.getAppAddress(privateKey)}${earningsSignature}`, start: 0, end: 56 },
    ];

    return this.getEarningStateAddress('settled', addressArgs);
  }

  private getLastEthBlockTransaction(privateKey, blockId: number) {
    // prepare transaction
    // const hashToSign = createHash('sha512').update(issueEarningsDetailsPB.serializeBinary()).digest('hex').toLowerCase();    
    // const earningsSignature = TransactionManager.getSigner(privateKey).sign(Buffer.from(hashToSign));
    const lastEthBlock = new earnings_pb.LastEthBlock();
    lastEthBlock.setId(blockId);    
    const params = new any.Any();
    params.setValue(lastEthBlock.serializeBinary());
    params.setTypeUrl('github.com/propsproject/pending-props/protos/pending_props_pb.LastEthBlock');
    const rpcRequest = this.getRPCRequest(params, payloads_pb.Method.LAST_ETH_BLOCK_UPDATE);
    const rpcRequestBytes = rpcRequest.serializeBinary();
    const stateAddress = this.getLastEthBlockStateAddress();    
    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
        familyName: this.familyName,
        familyVersion: this.familyVersion,
        inputs: [stateAddress],
        outputs: [stateAddress],
        signerPublicKey: TransactionManager.getPublicKey(privateKey),
        batcherPublicKey: TransactionManager.getPublicKey(privateKey),
        dependencies: [],
        payloadSha512: createHash('sha512').update(rpcRequestBytes).digest('hex'),
    }).finish();

    const signature = TransactionManager.getSigner(privateKey).sign(transactionHeaderBytes);
    const tx =  protobuf.Transaction.create({
      header: transactionHeaderBytes,
      headerSignature: signature,
      payload: rpcRequestBytes,
    });    
    return tx;
  }
  private getIssueTransaction(privateKey, issueEarningsDetailsPB: any) {
    // prepare transaction
    const hashToSign = createHash('sha512').update(issueEarningsDetailsPB.serializeBinary()).digest('hex').toLowerCase();    
    const earningsSignature = TransactionManager.getSigner(privateKey).sign(Buffer.from(hashToSign));
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
      { data: `${issueEarningsDetailsPB.getRecipientPublicAddress()}${TransactionManager.getAppAddress(privateKey)}${earningsSignature}`, start: 0, end: 56 },
    ];

    const stateAddress = this.getEarningStateAddress('pending', addressArgs);
    const balanceAddress = this.getBalanceStateAddress(issueEarningsDetailsPB.getRecipientPublicAddress());
    const balanceTimestampAddress = this.getBalanceTimestateAddressPrefix(issueEarningsDetailsPB.getRecipientPublicAddress());
    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
        familyName: this.familyName,
        familyVersion: this.familyVersion,
        inputs: [balanceAddress, stateAddress],
        outputs: [balanceAddress, balanceTimestampAddress, stateAddress],
        signerPublicKey: TransactionManager.getPublicKey(privateKey),
        batcherPublicKey: TransactionManager.getPublicKey(privateKey),
        dependencies: [],
        payloadSha512: createHash('sha512').update(rpcRequestBytes).digest('hex'),
    }).finish();

    const signature = TransactionManager.getSigner(privateKey).sign(transactionHeaderBytes);
    const tx =  protobuf.Transaction.create({
      header: transactionHeaderBytes,
      headerSignature: signature,
      payload: rpcRequestBytes,
    });    
    return tx;
  }
  
  
  private getBalanceUpdateTransaction(privateKey, balanceUpdateData: BalanceUpdate, authAddresses: string[]) {    
    const balanceUpdate = new earnings_pb.BalanceUpdate();
    balanceUpdate.setRecipientPublicAddress(TransactionManager.normalizeWalletAddress(balanceUpdateData.recipient));
    balanceUpdate.setRecipientOnchainBalance(balanceUpdateData.recipientBalance);
    balanceUpdate.setFromPublicAddress(TransactionManager.normalizeWalletAddress(balanceUpdateData.from));
    balanceUpdate.setFromOnchainBalance(balanceUpdateData.fromBalance);
    balanceUpdate.setTxHash(balanceUpdateData.txHash);
    balanceUpdate.setBlockId(balanceUpdateData.blockId);
    balanceUpdate.setTimestamp(balanceUpdateData.timestamp);

        
    const params = new any.Any();
    params.setValue(balanceUpdate.serializeBinary());    
    params.setTypeUrl('github.com/propsproject/pending-props/protos/pending_props_pb.BalanceUpdate');
    const rpcRequest = this.getRPCRequest(params, payloads_pb.Method.BALANCE_UPDATE);
    const rpcRequestBytes = rpcRequest.serializeBinary();
    
    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
        familyName: this.familyName,
        familyVersion: this.familyVersion,
        inputs: [...authAddresses],
        outputs: [...authAddresses],
        signerPublicKey: TransactionManager.getPublicKey(privateKey),
        batcherPublicKey: TransactionManager.getPublicKey(privateKey),
        dependencies: [],
        payloadSha512: createHash('sha512').update(rpcRequestBytes).digest('hex'),
    }).finish();

    const signature = TransactionManager.getSigner(privateKey).sign(transactionHeaderBytes);
    const tx =  protobuf.Transaction.create({
      header: transactionHeaderBytes,
      headerSignature: signature,
      payload: rpcRequestBytes,
    });    
    return tx;
  }

  private getRevokeTransaction(privateKey, stateAddress: string, authAddresses: string[]) {
    const stateAddresses: string[] = [stateAddress];
    const paramData = JSON.stringify({ timestamp: moment().unix(), addresses: stateAddresses });
    const params = new any.Any();
    params.setValue(Buffer.from(paramData));    
    const rpcRequest = this.getRPCRequest(params, payloads_pb.Method.REVOKE);
    const rpcRequestBytes = rpcRequest.serializeBinary();
    const revokeAddresses: string[] = [];

    stateAddresses.forEach((address) => {
      const revokeAddress:string = `${this.prefixes['revoked']}${address.substring(6)}`;
      revokeAddresses.push(revokeAddress);
      this.revokedAddresses[address] = revokeAddress;
    });
    
    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
        familyName: this.familyName,
        familyVersion: this.familyVersion,
        inputs: [...authAddresses, ...stateAddresses, ...revokeAddresses],
        outputs: [...authAddresses, ...stateAddresses, ...revokeAddresses],
        signerPublicKey: TransactionManager.getPublicKey(privateKey),
        batcherPublicKey: TransactionManager.getPublicKey(privateKey),
        dependencies: [],
        payloadSha512: createHash('sha512').update(rpcRequestBytes).digest('hex'),
    }).finish();

    const signature = TransactionManager.getSigner(privateKey).sign(transactionHeaderBytes);
    const tx =  protobuf.Transaction.create({
      header: transactionHeaderBytes,
      headerSignature: signature,
      payload: rpcRequestBytes,
    });    
    return tx;
  }

  static getPublicKey(privateKey): string {
    return TransactionManager.getSigner(privateKey).getPublicKey().asHex();
  }

  getSubmitResponse(): SubmitAPIResponse {
    return this.lastSubmitResponse;
  }
}

export { TransactionManager, SubmitAPIResponse, BatchDetailsTransaction, WalletBalance };
