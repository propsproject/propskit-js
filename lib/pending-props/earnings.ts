import { createHash } from 'crypto';
import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';
import moment from 'moment';
import { Client } from '../client';
import { TransactionData } from '../client/rest';
import { AddressBuilder, Secp256k1Signer } from '../common';
import { Earning, EarningDetails } from '../proto/earning_pb';
import { Method, Params, RPCRequest } from '../proto/payload_pb';
import { TransactionHeader } from '../sawtooth-sdk-ts/transaction_pb';
import { earningAddress, FAMILY_NAME, FAMILY_VERSION, getBalanceAddress, NamespacePrefixes, settlementAddress } from './namespace';

// tslint:disable-next-line:no-var-requires
const BigNumber = require('bignumber.js');

// tslint:disable-next-line:no-namespace
export namespace StateAuth {
  /**
   * Get state address input/outputs for issuing a new earning
   *
   * @param {Earning} earning
   * @returns {ReadonlyArray < string >}
   */
  export function issue(earning : Earning) : ReadonlyArray < string > {
    const rec = earning.getDetails().getUserId();
    const app = earning.getDetails().getApplicationId();
    const postfix = `${app}${rec}${earning.getSignature()}`;
    const address = earningAddress(rec, app, postfix);
    const addrBalance = getBalanceAddress(rec, app);    
    return [address, addrBalance];
  }

  /**
   *  Get state address input/outputs for revoking a earning
   *
   * @param {ReadonlyArray < string >} addresses
   * @returns {ReadonlyArray < string >}
   */
  // tslint:disable-next-line:readonly-array
  export function revoke(addresses : ReadonlyArray < string >, recipients: string[], applicationId: string) : ReadonlyArray < string > {
    const revokeAddresses = addresses.map(addr => `${NamespacePrefixes.revoked()}${addr.substring(6)}`);
    
    // tslint:disable-next-line:readonly-array
    const addrBalance = [];    
    recipients.forEach(rec => {
      addrBalance.push(getBalanceAddress(rec, applicationId));      
    });
    return [
      ...addrBalance,      
      ...addresses,
      ...revokeAddresses,
    ];
  }

  /**
   *  Get state address input/outputs for settling with a specific ethereum settlement transfer transaction hash
   *
   * @param {string} ethTransactionHash
   * @param {string} recipient
   * @param {ReadonlyArray < string >} pendingAddresses
   * @returns {ReadonlyArray < string >}
   */
  export function settle(ethTransactionHash : string, pendingAddresses : ReadonlyArray < string >, rec: string) : ReadonlyArray < string > {
    const settleAddresses: ReadonlyArray < any > = pendingAddresses.map(addr => `${NamespacePrefixes.settled()}${addr.substring(6)}`);
    const addrBalance = getBalanceAddress(AddressBuilder('').normalizeAddress(rec), '');    
    return [
      addrBalance,      
      ...pendingAddresses,
      ...settleAddresses,
      ...settlementAddress(AddressBuilder('').normalizeAddress(ethTransactionHash)),
    ];
  }
}

/**
 *  class that handles building transactions pertaining to earnings
 *
 * @export
 * @class EarningsTransactor
 */
export class EarningsTransactor {
  // tslint:disable-next-line:readonly-keyword
  public prefixes = NamespacePrefixes;

  constructor(public singerPublicKey : string, public transactionStore : (t : TransactionData) => Client) {}

  /**
   *  Get a RPCRequest object
   *
   * @param {Uint8Array} data
   * @param {Method} method
   * @returns {RPCRequest}
   * @memberof EarningsTransactor
   */
  public rpcRequest(data : Uint8Array, method : Method) : RPCRequest {
    const params = new google_protobuf_any_pb.Any();
    params.setValue(data);
    params.setTypeUrl('github.com/propsproject/pending-props/protos/pending_props_pb.Earning');
    const reqParams = new Params();
    reqParams.setData(params);
    const payload = new RPCRequest();
    payload.setMethod(method);
    payload.setParams(reqParams);
    return payload;
  }

  /**
   * Get EarningDetails object
   *
   * @param {string} recipient
   * @param {string} application
   * @param {number} amount
   * @param {string} description
   * @returns {EarningDetails}
   * @memberof EarningsTransactor
   */
  // tslint:disable-next-line:member-access
  newEarningDetails(recipient : string, application : string, amount : number, description: string = '') : EarningDetails {
    const details: EarningDetails = new EarningDetails();
    details.setTimestamp(moment().unix());
    details.setUserId(recipient);
    details.setApplicationId(application);
    details.setDescription(description);
    BigNumber.set({ EXPONENTIAL_AT: 1e+9 });
    const propsAmount = new BigNumber(amount, 10);
    const tokensAmount = propsAmount.times(1e18);
    const zero = new BigNumber(0, 10);
    details.setAmountEarned(tokensAmount.toString());
    details.setAmountSettled(zero.toString());
    return details;
  }

  /**
   *  Get Earning object
   *
   * @param {string} recipient
   * @param {string} application
   * @param {number} amount
   * @param {Secp256k1Signer} signer
   * @param {string} description The description of the new earnings
   * @returns {Earning}
   * @memberof EarningsTransactor
   */
  public newEarning(recipient : string, application : string, amount : number, signer : Secp256k1Signer, description: string = '') : Earning {
    const details: EarningDetails = this.newEarningDetails(recipient, application, amount, description);
    const earning: Earning = new Earning();

    const hashToSign = createHash('sha512')
      .update(details.serializeBinary())
      .digest('hex')
      .toLowerCase();

    earning.setDetails(details);
    earning.setSignature(signer.sign(new Uint8Array(Buffer.from(hashToSign))));
    return earning;
  }

  /**
   *  Issue a new earning
   *
   * @param {string} recipient
   * @param {string} application
   * @param {number} amount
   * @param {Secp256k1Signer} signer
   * @param {string} description
   * @returns {*}
   * @memberof EarningsTransactor
   */
  public issue(recipient : string, application : string, amount : number, signer : Secp256k1Signer, description: string = '') : Client {
    const earning = this.newEarning(recipient, application, amount, signer, description);
    const stateAuthorization: ReadonlyArray < string > = StateAuth.issue(earning);
    const request: RPCRequest = this.rpcRequest(earning.serializeBinary(), Method.ISSUE);
    const data = Object.freeze({
      header: this.getHeader(stateAuthorization, request),
      request,
    });

    return this.transactionStore(data);;
  }

  /**
   * Revoke an earning
   *
   * @param {< string[] >} recipients
   * @param {< string >} applicationId
   * @param {< string[] >} addresses   
   * @returns {*}
   * @memberof EarningsTransactor
   */
  // tslint:disable-next-line:readonly-array
  public revoke(recipients: string[], applicationId: string, ...addresses : string[]) : Client {
    const request: RPCRequest = this.rpcRequest(Buffer.from(JSON.stringify({ addresses })), Method.REVOKE);
    const stateAuthorization: ReadonlyArray < string > = StateAuth.revoke(addresses, recipients, applicationId);

    const data = Object.freeze({
      header: this.getHeader(stateAuthorization, request),
      request,
    });

    return this.transactionStore(data);;
  }

  /**
   * Get Settlement transaction for submission
   *
   * @param {string} ethTransactionHash
   * @param {string} recipient
   * @param {ReadonlyArray < string >} pendingAddresses
   * @returns {*}
   * @memberof EarningsTransactor
   */
  public settle(ethTransactionHash : string, recipient : string, pendingAddresses : ReadonlyArray < string >) : Client {
    const stateAuthorization: ReadonlyArray < string > = StateAuth.settle(AddressBuilder('').normalizeAddress(ethTransactionHash), pendingAddresses, AddressBuilder('').normalizeAddress(recipient));
    const reqData: string = JSON.stringify({
      eth_transaction_hash: AddressBuilder('').normalizeAddress(ethTransactionHash), 
      pending_addresses: pendingAddresses,
      recipient: AddressBuilder('').normalizeAddress(recipient),       
    });
    const request: RPCRequest = this.rpcRequest(Buffer.from(reqData), Method.SETTLE);

    const data = Object.freeze({
      header: this.getHeader(stateAuthorization, request),
      request,
    });

    return this.transactionStore(data);;
  }

  /**
   * Get TransactionHeader object
   *
   * @param {*} stateAuthorization
   * @param {RPCRequest} request
   * @returns {TransactionHeader}
   * @memberof EarningsTransactor
   */
  public getHeader(stateAuthorization : any, request : RPCRequest) : TransactionHeader {
    const txHeader: TransactionHeader = new TransactionHeader();
    txHeader.setFamilyName(FAMILY_NAME);
    txHeader.setFamilyVersion(FAMILY_VERSION);
    txHeader.setInputsList(stateAuthorization.map(a => a));
    txHeader.setOutputsList(stateAuthorization.map(a => a));
    txHeader.setPayloadSha512(createHash('sha512').update(request.serializeBinary()).digest('hex'));
    txHeader.setSignerPublicKey(this.singerPublicKey);
    return txHeader;
  }
};
