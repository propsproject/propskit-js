const _ = require('lodash');
const { createContext, CryptoFactory } = require('sawtooth-sdk/signing');
const { Secp256k1PrivateKey } = require('sawtooth-sdk/signing/secp256k1');
const rp = require('request-promise');
const { protobuf } = require('sawtooth-sdk');
const any = require('google-protobuf/google/protobuf/any_pb.js');
const payload_pb = require('./proto/payload_pb');
const balance_pb = require('./proto/balance_pb');
const users_pb = require('./proto/users_pb');
const transaction_pb = require('./proto/transaction_pb');
const activity_pb = require('./proto/activity_pb');
const ethUtil = require('ethereumjs-util');
const { createHash } = require('crypto');
const moment = require('moment');
const BigNumber = require('bignumber.js');
BigNumber.set({ EXPONENTIAL_AT: 1e+9 });
const Web3 = require('web3');
const web3 = new Web3();

import TransactionPayload from './payloads/transaction_payload';
import ActivityPayload from './payloads/activity_payload';
import WalletLinkPayload from './payloads/wallet_link_payload';
import { Balance } from './proto/balance_pb';
import { LastEthBlock, Method, Params, RPCRequest, SettlementData } from './proto/payload_pb';
import { WalletToUser } from './proto/users_pb';
import { Transaction } from './proto/transaction_pb';

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

interface IBalance {
  pending: string; // bigNumber
  totalPending: string; // bigNumber
  transferable: string; // bigNumber
  bonded: string; // bigNumber
  delegated: string; // bigNumber
  delegatedTo: string; // address
  total: string; // bigNumber = APP Power = totalPending + transferable + delegated
  timestamp: number;
  linkedWallet: string;
  lastUpdateType: number;
  type: number;
  balanceUpdateIndex: number;
}
/**
 * @api WalletBalance WalletBalance
 * @apiName WalletBalance
 * @apiGroup Interfaces
 *
 *
 * @apiSuccessExample
 * interface WalletBalance
 * {
 *    wallet: string;
 *    pending: string; // bigNumber
 *    totalPending: string; // bigNumber
 *    transferable: string; // bigNumber
 *    bonded: string; // bigNumber
 *    delegated: string; // bigNumber
 *    delegatedTo: string; // address
 *    total: string; // bigNumber = APP Power = totalPending + transferable + delegated
 *    timestamp: number;
 *    linkedWallet: string;
 *    lastUpdateType: number;
 *    type: number;
 *  }
 */
interface WalletBalance extends IBalance {
  wallet: string;
}
/**
 * @api ApplicationUser ApplicationUser
 * @apiName ApplicationUser
 * @apiGroup Interfaces
 *
 *
 * @apiSuccessExample
 * interface ApplicationUser
 * {
 *    userId: string;
 *    applicationId: string;
 *  }
 */
interface ApplicationUser {
  userId: string;
  applicationId: string;
}
/**
 * @api AppUserBalance AppUserBalance
 * @apiName AppUserBalance
 * @apiGroup Interfaces
 *
 *
 * @apiSuccessExample
 * interface ApplicationUserBalance
 * {
 *    userId: string;
 *    applicationId: string;
 *    pending: string; // bigNumber
 *    totalPending: string; // bigNumber
 *    transferable: string; // bigNumber
 *    bonded: string; // bigNumber
 *    delegated: string; // bigNumber
 *    delegatedTo: string; // address
 *    total: string; // bigNumber = APP Power = totalPending + transferable + delegated
 *    timestamp: number;
 *    linkedWallet: string;
 *    lastUpdateType: number;
 *    type: number;
 *  }
 */
interface AppUserBalance extends IBalance {
  applicationId: string;
  userId: string;
}

interface BalanceUpdate {
  address: string;
  balance: string;
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
  rewardsStartTimestamp?: number;
  secondsInDay?: number;
}


let instance = null;

class TransactionManager {
  familyName: string;
  familyVersion: string;
  https: boolean;
  host: string;
  port: number;
  rewardsStartTimestamp: number;
  secondsInDay: number;

  lastStateData: string[];
  revokedAddresses: any;
  requestTimestamp: number;

  lastSubmitResponse: SubmitAPIResponse;
  lastStatusResponse: StatusAPIResponse[];

  prefixes;

  // if this is turned on transactions won't be submitted until commitTransactions is called
  accumulateTransactions: boolean;
  transactions: any[];

  static getInstance(args: TransactionManagerOptions) {
    if (_.isNull(instance)) {
      instance = new TransactionManager(args);
    }

    return instance;
  }

  constructor(options: TransactionManagerOptions) {
    this.familyName = options.familyName;
    this.familyVersion = options.familyVersion;
    if (_.isUndefined(options.https) || options.https === false) {
      this.https = false;
    } else {
      this.https = true;
    }
    this.host = _.isUndefined(options.host) ? '127.0.0.1' : options.host;
    this.port = _.isUndefined(options.port) ? 8008 : options.port;
    this.rewardsStartTimestamp = _.isUndefined(options.rewardsStartTimestamp) ? 1562803200 : options.rewardsStartTimestamp;
    this.secondsInDay = _.isUndefined(options.secondsInDay) ? 86400 : options.secondsInDay;

    this.revokedAddresses = {};
    this.prefixes = {
      transaction: createHash('sha512').update('pending-props:earnings:transaction').digest('hex').substring(0, 6),
      balance: createHash('sha512').update('pending-props:earnings:balance').digest('hex').substring(0, 6),
      balanceUpdate: createHash('sha512').update('pending-props:earnings:bal-rtx').digest('hex').substring(0, 6),
      blockIdUpdate: createHash('sha512').update('pending-props:earnings:lastethblock').digest('hex').substring(0, 6),
      walletLink: createHash('sha512').update('pending-props:earnings:walletl').digest('hex').substring(0, 6),
      activityLog: createHash('sha512').update('pending-props:earnings:activity_log').digest('hex').substring(0, 6),
      settlement: createHash('sha512').update('pending-props:earnings:settlements').digest('hex').substring(0, 6),
    };

    this.accumulateTransactions = false;
    this.transactions = [];
  }
/**
 * @api commitTransactions commitTransactions
 * @apiDescription Submit transactions accumaleted when used with setAccumulateTransactions api
 * @apiName commitTransactions
 * @apiGroup TransactionManager-Utils
 *
 * @apiParam {string} pk Private key used to sign the transactions for the sidechain
 *
 * @apiSuccessExample Promise<boolean>
 * response from sidechain can be retrieved upon success with getSubmitResponse API
 */

  async commitTransactions(privateKey): Promise<boolean> {
    if (this.transactions.length === 0) {
      throw new Error('No transactions to be committed');
    }
    const batch = this.getBatch(privateKey, this.transactions);
    const ret:boolean = await this.makeSubmitAPIRequest(batch);
    this.transactions = [];
    return ret;
  }

  /**
 * @api setAccumulateTransactions setAccumulateTransactions
 * @apiDescription By turning this on you can create many transactions and later commit them with commitTransactions api
 * @apiName setAccumulateTransactions
 * @apiGroup TransactionManager-Utils
 *
 * @apiParam {boolean} b Turn on or off. By default this is off.
 *
 */
  setAccumulateTransactions(b: boolean): void {
    this.accumulateTransactions = b;
    this.transactions = [];
  }

  httpPrefix(): string {
    return this.https ? 'https://' : 'http://';
  }

  batchesUrl(): string {
    return this.httpPrefix() + this.host + ':' + this.port + '/batches';
  }

  stateAddressUrl(stateAddress: string, count: number = 200) {
    return this.httpPrefix() + this.host + ':' + this.port + '/state?address=' + stateAddress + '&limit=' + count;
  }

  static normalizeAddress(str: string): string {
    if (str.length > 0) {
      if (str.substr(0,2) === '0x') {
        return str.toLowerCase();
      } else {
        return `0x${str.toLowerCase()}`;
      }
    }
    return str;
  }

  static normalizeTimestamp(timestamp: number) {
    if (timestamp.toString().length > 10) {// its in miliseconds
      return Math.floor(timestamp / 1000);
    }
    return timestamp;
  }

  // static normalizeWalletAddress(walletAddress: string): string {
  //   const strippedWalletAddress = walletAddress.substr(0,2) === '0x' ? walletAddress.substr(2) : walletAddress;
  //   return _.toUpper(strippedWalletAddress);
  // }

  static getSigner(privateKey) {
    const ctx = createContext('secp256k1');
    const cryptoFactory = new CryptoFactory(ctx);
    return cryptoFactory.newSigner(Secp256k1PrivateKey.fromHex(privateKey));
  }

  static getAppAddress(privateKey) {
    const signer = TransactionManager.getSigner(privateKey);
    return TransactionManager.normalizeAddress(ethUtil.pubToAddress(signer.getPublicKey().asBytes(), true).toString('hex'));
  }

/**
 * @api signMessage signMessage
 * @apiDescription Signs an Ethereum style message using web3
 * @apiName signMessage
 * @apiGroup TransactionManager-Utils
 *
 * @apiParam {string} msg Message to be signed
 * @apiParam {string} address Address which belongs to this private key
 * @apiParam {string} pk Private key used to sign the msg
 *
 * @apiSuccessExample string
 * signature
 */
  static async signMessage(msg: string, address: string, pk: string) {
    const privateKey = pk;
    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
    const signed = account.sign(msg);
    return signed.signature;
  }
/**
 * @api recoverFromSignature recoverFromSignature
 * @apiDescription Recovers the accountn address from the message signed and the signature
 * @apiName recoverFromSignature
 * @apiGroup TransactionManager-Utils
 *
 * @apiParam {string} msg Message that was signed
 * @apiParam {string} sig Signed message
 *
 * @apiSuccessExample string
 * address
 */
  static async recoverFromSignature(msg: string, sig: string) {
    return web3.eth.accounts.recover(msg, sig);
  }
/**
 * @api getLatestEthBlockId getLatestEthBlockId
 * @apiDescription Retreive the last synched Ethereum block id
 * @apiName getLatestEthBlockId
 * @apiGroup TransactionManager-Utils
 *
 * @apiSuccessExample Promise<number>
 * Etheruem block number
 */

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
        const block: LastEthBlock = new payload_pb.LastEthBlock.deserializeBinary(bytes);
        blockId = block.getId();
      });

      return blockId;
    } catch (error) {
      throw error;
    }
  }

/**
 * @api getLinkedWalletApplicationUsers getLinkedWalletApplicationUsers
 * @apiDescription Get list of application user objects linked to a wallet link address
 * @apiName getLinkedWalletApplicationUsers
 * @apiGroup TransactionManager-Utils
 *
 * @apiParam {string} walletLinkAddress The wallet link address on the sidechain can be calculated using getWalletLinkAddress API
 *
 * @apiSuccessExample Promise<ApplicationUser[]>
 * .
 */

  async getLinkedWalletApplicationUsers(walletLinkAddress: string): Promise<ApplicationUser[]> {
    const options = {
      method: 'GET',
      uri: this.stateAddressUrl(walletLinkAddress),
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = JSON.parse(await rp(options));
      const data = res.data;
      const applicationUsers: ApplicationUser[] = [];

      data.forEach((entry) => {
        const bytes = new Uint8Array(Buffer.from(entry.data, 'base64'));
        const walletToUser: WalletToUser = new users_pb.WalletToUser.deserializeBinary(bytes);
        console.log(`walletToUser=${JSON.stringify(walletToUser.toObject())}`);
        const walletToUserList =  walletToUser.getUsersList();
        for (let i = 0; i < walletToUserList.length; i = i + 1) {
          const appUser: ApplicationUser = {
            userId: walletToUserList[i].getUserId(),
            applicationId: walletToUserList[i].getApplicationId(),
          };
          applicationUsers.push(appUser);
        }
      });

      return applicationUsers;
    } catch (error) {
      throw error;
    }
  }

  static isValidSignature(signature: string): boolean {
    try {
      const rpc = ethUtil.fromRpcSig(signature);
      return ethUtil.isValidSignature(rpc.v, rpc.r, rpc.s);
    } catch (err) {
      return false;
    }
  }

  calcTotalAppPower(balance: IBalance): string { // bigNumber
    const totalPending = new BigNumber(balance.totalPending, 10);
    const transferable = new BigNumber(balance.transferable, 10);
    const delegated = new BigNumber(balance.delegated, 10);
    return totalPending.plus(transferable).plus(delegated).toString();
  }

/**
 * @api getBalanceByAppUser getBalanceByAppUser
 * @apiDescription Get an application user balance object
 * @apiName getBalanceByAppUser
 * @apiGroup TransactionManager-Utils
 *
 * @apiParam {string} applicationId
 * @apiParam {string} userId
 *
 * @apiSuccessExample Promise<AppUserBalance>
 * .
 */
  async getBalanceByAppUser(applicationId: string, userId: string): Promise<AppUserBalance> {
    const balanceAddress: string = this.getBalanceStateAddress(applicationId, userId);
    const options = {
      method: 'GET',
      uri: this.stateAddressUrl(balanceAddress),
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = JSON.parse(await rp(options));
      const data = res.data;
      let appUserBalance: AppUserBalance = null;

      data.forEach((entry) => {
        const bytes = new Uint8Array(Buffer.from(entry.data, 'base64'));
        const balance: Balance = new balance_pb.Balance.deserializeBinary(bytes);

        appUserBalance = {
          pending: balance.getBalanceDetails().getPending(),
          totalPending: balance.getBalanceDetails().getTotalPending(),
          transferable: balance.getBalanceDetails().getTransferable(),
          bonded: balance.getBalanceDetails().getBonded(),
          delegated: balance.getBalanceDetails().getDelegated(),
          delegatedTo: balance.getBalanceDetails().getDelegatedto(),
          total: '0',
          timestamp: TransactionManager.normalizeTimestamp(balance.getBalanceDetails().getTimestamp()),
          applicationId: balance.getApplicationId(),
          userId: balance.getUserId(),
          linkedWallet: balance.getLinkedWallet(),
          lastUpdateType: balance.getBalanceDetails().getLastUpdateType(),
          type: balance.getType(),
          balanceUpdateIndex: balance.getBalanceUpdateIndex(),
        };
      });

      if (appUserBalance != null) {
        appUserBalance.total = this.calcTotalAppPower(appUserBalance);
      }


      return appUserBalance;
    } catch (error) {
      throw error;
    }
  }

/**
 * @api getBalanceByWallet getBalanceByWallet
 * @apiDescription Get a wallet balance object
 * @apiName getBalanceByWallet
 * @apiGroup TransactionManager-Utils
 *
 * @apiParam {string} wallet
 *
 * @apiSuccessExample Promise<WalletBalance>
 * .
 */
  async getBalanceByWallet(wallet: string): Promise<WalletBalance> {
    const appUserBalance: AppUserBalance = await this.getBalanceByAppUser('', TransactionManager.normalizeAddress(wallet));

    const walletBalance: WalletBalance = {
      wallet: appUserBalance.userId,
      pending: appUserBalance.pending,
      totalPending: appUserBalance.totalPending,
      transferable: appUserBalance.transferable,
      bonded: appUserBalance.bonded,
      delegated: appUserBalance.delegated,
      delegatedTo: appUserBalance.delegatedTo,
      total: appUserBalance.total,
      timestamp: appUserBalance.timestamp,
      linkedWallet: appUserBalance.linkedWallet,
      lastUpdateType: appUserBalance.lastUpdateType,
      type: appUserBalance.type,
      balanceUpdateIndex: appUserBalance.balanceUpdateIndex,
    };
    return walletBalance;
  }

  public getTransactionForCommit(): string {
    return JSON.stringify(this.transactions);
  }

  public getTransactionCountForCommit(): number {
    return this.transactions.length;
  }

/**
 * @api submitSettlementTransaction submitSettlementTransaction
 * @apiDescription Submits an etheruem settlement transactions to generate a settlement
 * @apiName submitSettlementTransaction
 * @apiGroup TransactionManager
 *
 * @apiParam {string} pk Private key used to sign the transactions for the sidechain
 * @apiParam {string} applicationId
 * @apiParam {string} userId
 * @apiParam {string} amount (BigNumber)
 * @apiParam {string} toAddress user's wallet address
 * @apiParam {string} fromAddress application's rewards address
 * @apiParam {string} txHash Ethereum transaction hash
 * @apiParam {number} blockId Ethereum block number of the above transaction hash / balance update
 * @apiParam {number} timestamp Ethereum block timestamp of the above transaction hash / balance update
 * @apiSuccessExample Promise<boolean>
 * .
 */
  public async submitSettlementTransaction(privateKey, _applicationId: string, _userId: string, _amount: string, _toAddress: string, _fromAddress: string, _txHash: string, _blockId: number, _timestamp: number):Promise<boolean> {
    const transactions = [];
    const applicationId = TransactionManager.normalizeAddress(_applicationId);
    const toAddress = TransactionManager.normalizeAddress(_toAddress);
    const fromAddress = TransactionManager.normalizeAddress(_fromAddress);
    const normalizedTxHash = TransactionManager.normalizeAddress(_txHash);
    const normalizedTimestamp = TransactionManager.normalizeTimestamp(_timestamp);  
    const walletBalanceAddress: string = this.getBalanceStateAddress('', _toAddress);
    const userBalanceAddress: string = this.getBalanceStateAddress(_applicationId, _userId);
    const settlementTransactionAddress: string = this.getTransactionStateAddress(Method.SETTLE, _applicationId, _userId, _timestamp);
    const settlementAddress: string = this.getSettlementStateAddress(_txHash);
    
    const settlementData: SettlementData = new payload_pb.SettlementData();
    settlementData.setApplicationId(applicationId);
    settlementData.setUserId(_userId);
    settlementData.setAmount(_amount);
    settlementData.setToAddress(toAddress)
    settlementData.setFromAddress(fromAddress);
    settlementData.setTxHash(normalizedTxHash);
    settlementData.setBlockId(_blockId);
    settlementData.setTimestamp(normalizedTimestamp);
    
    const authAddresses = [];
    authAddresses.push(walletBalanceAddress);
    authAddresses.push(userBalanceAddress);
    authAddresses.push(settlementTransactionAddress);
    authAddresses.push(settlementAddress);

    const walletLinkAddress = this.getWalletLinkAddress(toAddress);
    authAddresses.push(walletLinkAddress);
    const activityLogAddress = this.getActivityLogAddress(settlementData.getUserId(), settlementData.getApplicationId());
    authAddresses.push(activityLogAddress);
    const appUserBalance:AppUserBalance = await this.getBalanceByAppUser(applicationId, _userId);
    if (appUserBalance !== null && 'linkedWallet' in appUserBalance && appUserBalance.linkedWallet.length > 0) {
      const walletBalanceAddress = this.getBalanceStateAddress('', appUserBalance.linkedWallet);
      const walletLinkAddress = this.getWalletLinkAddress(appUserBalance.linkedWallet);
      authAddresses.push(walletLinkAddress);
      authAddresses.push(walletBalanceAddress);
      const applicationUsers:ApplicationUser[] = await this.getLinkedWalletApplicationUsers(walletLinkAddress);
      for (let i = 0; i < applicationUsers.length; i = i + 1) {
        if (applicationUsers[i].applicationId !== applicationId || applicationUsers[i].userId !== _userId) {
          authAddresses.push(this.getBalanceStateAddress(applicationUsers[i].applicationId, applicationUsers[i].userId));
          const activityLogAddress = this.getActivityLogAddress(applicationUsers[i].userId, applicationUsers[i].applicationId);
          authAddresses.push(activityLogAddress);
        }
      }
    }

    transactions.push(this.getSettlementTransaction(privateKey, settlementData, authAddresses));
    if (!this.accumulateTransactions) {
      const batch = this.getBatch(privateKey, transactions);
      return this.makeSubmitAPIRequest(batch);
    } else {
      this.transactions = this.transactions.concat(transactions);
    }
    return true;
  }

/**
 * @api submitBalanceUpdateTransaction submitBalanceUpdateTransaction
 * @apiDescription Submits an etheruem transfer balance update transaction to the sidechain
 * @apiName submitBalanceUpdateTransaction
 * @apiGroup TransactionManager
 *
 * @apiParam {string} pk Private key used to sign the transactions for the sidechain
 * @apiParam {string} address Wallet address
 * @apiParam {string} addressBalance Balance of the wallet address (BigNumber)
 * @apiParam {string} txHash Ethereum transaction hash
 * @apiParam {number} blockId Ethereum block number of the above transaction hash / balance update
 * @apiParam {number} timestamp Ethereum block timestamp of the above transaction hash / balance update
 * @apiSuccessExample Promise<boolean>
 * .
 */
  public async submitBalanceUpdateTransaction(privateKey, _address: string, _addressBalance: string, txHash: string, blockId: number, timestamp: number):Promise<boolean> {
    const address = TransactionManager.normalizeAddress(_address);
    const normalizedTxHash = TransactionManager.normalizeAddress(txHash);
    const transactions = [];
    const balanceAddress: string = this.getBalanceStateAddress('', address);
    const balanceUpdateAddress: string = this.getBalanceUpdateAddress(normalizedTxHash, address);
    const balanceUpdateData: BalanceUpdate = {
      address,
      balance: _addressBalance,
      txHash: normalizedTxHash,
      blockId,
      timestamp: TransactionManager.normalizeTimestamp(timestamp),
    };
    const authAddresses = [];
    authAddresses.push(balanceAddress);
    authAddresses.push(balanceUpdateAddress);

    const walletLinkAddress = this.getWalletLinkAddress(address);
    authAddresses.push(walletLinkAddress);    
    let applicationUsers:ApplicationUser[] = [];
    try {
      applicationUsers = await this.getLinkedWalletApplicationUsers(walletLinkAddress);
    } catch (error) {
      // do nothing - it can be empty
    }
    if (applicationUsers.length > 0) {
      for (let i = 0; i < applicationUsers.length; i = i + 1) {
        authAddresses.push(this.getBalanceStateAddress(applicationUsers[i].applicationId, applicationUsers[i].userId));
        // also add the settle transaction address incase a settle would be needed
        authAddresses.push(this.getTransactionStateAddress(Method.SETTLE, applicationUsers[i].applicationId, applicationUsers[i].userId, balanceUpdateData.timestamp));
        authAddresses.push(this.getActivityLogAddress(applicationUsers[i].userId, applicationUsers[i].applicationId));
      }
    }


    transactions.push(this.getBalanceUpdateTransaction(privateKey, balanceUpdateData,authAddresses));
    if (!this.accumulateTransactions) {
      const batch = this.getBatch(privateKey, transactions);
      return this.makeSubmitAPIRequest(batch);
    } else {
      this.transactions = this.transactions.concat(transactions);
    }
    return true;
  }

  /**
 * @api submitRevokeTransaction submitRevokeTransaction
 * @apiDescription Submits a revoke transaction to the sidechain
 * @apiName submitRevokeTransaction
 * @apiGroup TransactionManager
 *
 * @apiParam {string} pk Private key used to sign the transactions for the sidechain
 * @apiParam {TransactionPayload[]} payloads Payload for revoke transaction
 * @apiParam {number} timestamp Timestamp of the transaction
 * @apiSuccessExample Promise<boolean>
 * .
 */
  public async submitRevokeTransaction(privateKey, payloads:TransactionPayload[], timestamp: number):Promise<boolean> {
    this.requestTimestamp = TransactionManager.normalizeTimestamp(timestamp);
    const transactions = [];

    for (let i = 0; i < payloads.length; i += 1) {
      transactions.push(await this.getTransaction(privateKey, this.getTransactionPB(privateKey, payload_pb.Method.REVOKE,payloads[i])));
    }

    if (!this.accumulateTransactions) {
      const batch = this.getBatch(privateKey, transactions);
      return this.makeSubmitAPIRequest(batch);
    } else {
      this.transactions = this.transactions.concat(transactions);
    }
    return true;
  }

/**
 * @api submitIssueTransaction submitIssueTransaction
 * @apiDescription Submits an issue transaction to the sidechain
 * @apiName submitIssueTransaction
 * @apiGroup TransactionManager
 *
 * @apiParam {string} pk Private key used to sign the transactions for the sidechain
 * @apiParam {TransactionPayload[]} payloads Payload for issue transaction
 * @apiParam {number} timestamp Timestamp of the transaction
 * @apiSuccessExample Promise<boolean>
 * .
 */
  public async submitIssueTransaction(privateKey, payloads:TransactionPayload[], timestamp: number):Promise<boolean> {
    this.requestTimestamp = TransactionManager.normalizeTimestamp(timestamp);
    const transactions = [];

    for (let i = 0; i < payloads.length; i += 1) {
      transactions.push(await this.getTransaction(privateKey, this.getTransactionPB(privateKey, payload_pb.Method.ISSUE,payloads[i])));
    }

    if (!this.accumulateTransactions) {
      const batch = this.getBatch(privateKey, transactions);
      return this.makeSubmitAPIRequest(batch);
    } else {
      this.transactions = this.transactions.concat(transactions);
    }
    return true;
  }

 /**
 * @api submitNewEthBlockIdTransaction submitNewEthBlockIdTransaction
 * @apiDescription Submits the Ethereum blockId and timestamp which was lastly synched
 * @apiName submitNewEthBlockIdTransaction
 * @apiGroup TransactionManager
 *
 * @apiParam {string} pk Private key used to sign the transactions for the sidechain
 * @apiParam {number} blockId Block number on Ethereum
 * @apiParam {number} timestamp Timestamp of the last block id
 * @apiSuccessExample Promise<boolean>
 * .
 */
  public async submitNewEthBlockIdTransaction(privateKey, blockId: number, timestamp: number): Promise<boolean> {
    const transactions = [];
    transactions.push(this.getLastEthBlockTransaction(privateKey, blockId, timestamp));
    if (!this.accumulateTransactions) {
      const batch = this.getBatch(privateKey, transactions);
      return this.makeSubmitAPIRequest(batch);
    } else {
      this.transactions = this.transactions.concat(transactions);
    }
    return true;
  }

/**
 * @api submitLinkWalletTransaction submitLinkWalletTransaction
 * @apiDescription Submits the wallet and signature to connect an application user to a wallet
 * @apiName submitLinkWalletTransaction
 * @apiGroup TransactionManager
 *
 * @apiParam {string} pk Private key used to sign the transactions for the sidechain
 * @apiParam {WalletLinkPayload} payload
 * @apiSuccessExample Promise<boolean>
 * .
 */
  public async submitLinkWalletTransaction(privateKey, payload: WalletLinkPayload): Promise<boolean> {
    const address = TransactionManager.normalizeAddress(payload.address);
    const transactions = [];
    const appUser:ApplicationUser = {
      applicationId: payload.applicationId,
      userId: payload.userId,
    };

    transactions.push(await this.getLinkWalletTransaction(privateKey, address, appUser, payload.signature));

    if (!this.accumulateTransactions) {
      const batch = this.getBatch(privateKey, transactions);
      return this.makeSubmitAPIRequest(batch);
    } else {
      this.transactions = this.transactions.concat(transactions);
    }
    return true;
  }

  private getActivityLogPB(payload: ActivityPayload): any {
    const activity = new activity_pb.ActivityLog();
    activity.setApplicationId(payload.applicationId);
    activity.setUserId(payload.userId);
    activity.setDate(payload.date);
    activity.setTimestamp(payload.timestamp);

    return activity;
  }

/**
 * @api submitActivityLog submitActivityLog
 * @apiDescription Submits a daily application user activity
 * @apiName submitActivityLog
 * @apiGroup TransactionManager
 *
 * @apiParam {string} pk Private key used to sign the transactions for the sidechain
 * @apiParam {ActivityPayload[]} activityPayloads wallet address to link
 * @apiSuccessExample Promise<boolean>
 * .
 */
  public async submitActivityLog(privateKey, activityPayloads: ActivityPayload[]): Promise<boolean> {
    const transactions = [];

    for (let i = 0; i < activityPayloads.length; i += 1) {
      transactions.push(await this.getActivityLogTransaction(privateKey, this.getActivityLogPB(activityPayloads[i])));
    }
  
    if (!this.accumulateTransactions) {
      const batch = this.getBatch(privateKey, transactions);
      return this.makeSubmitAPIRequest(batch);
    } else {
      this.transactions = this.transactions.concat(transactions);
    }
    return true;
  }

  public async statusLookup(batchUri: string): Promise<boolean> {
    return this.makeStatusAPIRequest(batchUri);
  }

/**
 * @api addressLookup addressLookup
 * @apiDescription Get data stored at a specific sidechain state address
 * @apiName addressLookup
 * @apiGroup TransactionManager-Utils
 *
 * @apiParam {string} address Sidechain state address
 * @apiParam {string} type TRANSACTION | LASTETHBLOCK | BALANCE | WALLETLINK | ACTIVITY_LOG | SETTLEMENT | BALANCE_UPDATE
 * @apiSuccessExample Promise<any>
 * The protobuffer representing the object
 */

  public async addressLookup(address: string, type: string = 'TRANSACTION', asArray: boolean = false, count: number = 100): Promise<any> {
    const res: boolean = await this.makeAddressAPIRequest(address, type, asArray, count);

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

  private async makeAddressAPIRequest(stateAddress: string, type: string, asArray: boolean = false, count: number = 100): Promise<boolean> {
    const options = {
      method: 'GET',
      uri: this.stateAddressUrl(stateAddress, count),
    };

    try {
      const retItems = [];
      let nextPage = true;
      let ret;
      while (nextPage) {
        const resStr = await rp(options);
        const res = JSON.parse(resStr);        
        const data = res.data;        
        let dataObject;
        data.forEach((element) => {
          ret = null;
          const bytes = new Uint8Array(Buffer.from(element.data, 'base64'));
          switch (type) {
            case 'TRANSACTION':
              dataObject = new transaction_pb.Transaction.deserializeBinary(bytes);
              ret = (dataObject.toObject());
              break;
            case 'LASTETHBLOCK':
              dataObject = new payload_pb.LastEthBlock.deserializeBinary(bytes);
              ret = (dataObject.toObject());
              break;
            case 'BALANCE':
              dataObject = new balance_pb.Balance.deserializeBinary(bytes);
              ret = (dataObject.toObject());
              break;
            case 'WALLETLINK':
              dataObject = new users_pb.WalletToUser.deserializeBinary(bytes);
              ret = (dataObject.toObject());
              break;
            case 'ACTIVITY_LOG':
              dataObject = new activity_pb.ActivityLog.deserializeBinary(bytes);
              ret = (dataObject.toObject());              
              break;
            case 'SETTLEMENT':
              dataObject = new payload_pb.SettlementData.deserializeBinary(bytes);
              ret = (dataObject.toObject());
              break;
            case 'BALANCE_UPDATE':
              dataObject = new payload_pb.BalanceUpdate.deserializeBinary(bytes);
              ret = (dataObject.toObject());
              break;
          }
          if (ret != null) {
            retItems.push(ret);
          }
          
        });
        if ('paging' in res && res.paging.next != null) {
          options.uri = res.paging.next;
        } else {
          nextPage = false;
        }
      }
      if (asArray) {
        this.lastStateData = retItems;
      } else {
        this.lastStateData = ret;
      }      
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

  public getTransactionStateAddress(transactionType: Method, applicationId: string, userId: string, timestamp: number): string {
    const prefix: string = this.prefixes['transaction'];
    const part1 = createHash('sha512')
        .update(`${transactionType}`)
        .digest('hex')
        .toLowerCase()
        .substring(0, 2);
    const part2 = createHash('sha512')
        .update(`${applicationId}`)
        .digest('hex')
        .toLowerCase()
        .substring(0, 10);
    const part3 = createHash('sha512')
        .update(`${userId}`)
        .digest('hex')
        .toLowerCase()
        .substring(0, 42);
    const part4 = createHash('sha512')
        .update(`${timestamp.toString()}`)
        .digest('hex')
        .toLowerCase()
        .substring(0, 10);

    return `${prefix}${part1}${part2}${part3}${part4}`;
  }

  
  public getSettlementStateAddress(txHash: string): string {
    const prefix: string = this.prefixes['settlement'];
    const postfix: string = createHash('sha512').update(`${txHash}`).digest('hex').toLowerCase().substring(0,64);    

    return `${prefix}${postfix}`;
  }

  public getBalanceStateAddress(applicationId: string, userId: string): string {
    const prefix: string = this.prefixes['balance'];
    const part1: string = createHash('sha512').update(`${applicationId}`).digest('hex').toLowerCase().substring(0,10);
    const part2: string = createHash('sha512').update(`${userId}`).digest('hex').toLowerCase().substring(0,54);

    return `${prefix}${part1}${part2}`;
  }

  public getBalanceUpdateAddress(txHash: string, address: string): string {
    const normalizedTxHash: string = TransactionManager.normalizeAddress(txHash);
    const prefix: string = this.prefixes['balanceUpdate'];
    const body: string = createHash('sha512').update(`${normalizedTxHash}`).digest('hex').toLowerCase().substring(0,40);
    const postfix: string = createHash('sha512').update(`${address}`).digest('hex').toLowerCase().substring(0,24);

    return `${prefix}${body}${postfix}`;
  }

  public getWalletLinkAddress(address: string): string {
    const normalizedAddress: string = TransactionManager.normalizeAddress(address);
    const prefix: string = this.prefixes['walletLink'];
    const body: string = createHash('sha512').update(`${normalizedAddress}`).digest('hex').toLowerCase().substring(0,64);
    return `${prefix}${body}`;
  }

  public getLastEthBlockStateAddress(): string {
    const prefix: string = this.prefixes['blockIdUpdate'];
    const postfix: string = createHash('sha512').update('LastEthBlockAddress').digest('hex').toLowerCase().substring(0,64);

    return `${prefix}${postfix}`;
  }

  public getApplicationActivityLogDailyAddress(rewardsDay: number, appId: string) {
    const prefix: string = this.prefixes['activityLog'];

    const part1 = createHash('sha512')
      .update(rewardsDay.toString())
      .digest('hex')
      .toLowerCase()
      .substring(0, 8);
    const part2 = createHash('sha512')
      .update(appId)
      .digest('hex')
      .toLowerCase()
      .substring(0, 10);    
    return `${prefix}${part1}${part2}`;
  }
  
  public getActivityLogAddress(userId: string, appId: string): string {
    const prefix: string = this.prefixes['activityLog'];    
    // const part1 = createHash('sha512')
    //   .update(date.toString())
    //   .digest('hex')
    //   .toLowerCase()
    //   .substring(0, 8);
    const part2 = createHash('sha512')
      .update(appId)
      .digest('hex')
      .toLowerCase()
      .substring(0, 16);
    const part3 = createHash('sha512')
      .update(userId)
      .digest('hex')
      .toLowerCase()
      .substring(0,48);
    return `${prefix}${part2}${part3}`;
  }

  private getRPCRequest(params, method) {
    const reqParams = new Params();
    reqParams.setData(params);

    const payload = new RPCRequest();
    payload.setMethod(method);
    payload.setParams(reqParams);

    return payload;
  }

  private getTransactionPB(privateKey, transactionType: Method, payload: TransactionPayload, timestamp: number = 0) {
    const transaction = new Transaction();
    transaction.setType(transactionType);
    transaction.setTimestamp(TransactionManager.normalizeTimestamp('timestamp' in payload ? payload.timestamp : (timestamp > 0 ? timestamp : this.requestTimestamp)));
    transaction.setApplicationId(payload.applicationId);
    transaction.setUserId(payload.userId);
    transaction.setDescription(payload.description);
    BigNumber.set({ EXPONENTIAL_AT: 1e+9 });
    const propsAmount = new BigNumber(payload.amount, 10);
    const tokensAmount = propsAmount.times(1e18);
    transaction.setAmount(tokensAmount.toString());
    return transaction;
  }

  private async getLinkWalletTransaction(privateKey, address: string, appUser: ApplicationUser, sig: string) {
    const walletToUser:WalletToUser = new users_pb.WalletToUser();
    walletToUser.setAddress(address);
    const applicationUser = new users_pb.ApplicationUser();
    applicationUser.setUserId(appUser.userId);
    applicationUser.setApplicationId(appUser.applicationId);
    applicationUser.setSignature(sig);
    const timestamp: number = moment().unix();
    applicationUser.setTimestamp(timestamp);
    walletToUser.addUsers(applicationUser);
    const authAddresses = [];
    const walletLinkAddress = this.getWalletLinkAddress(address);
    console.log(`walletLinkAddress=${walletLinkAddress}, address=${address}`);
    const walletBalanceAddress = this.getBalanceStateAddress('', address);
    const userBalanceAddress = this.getBalanceStateAddress(appUser.applicationId, appUser.userId);
    const activityAddress = this.getActivityLogAddress(appUser.userId, appUser.applicationId);
    authAddresses.push(walletLinkAddress);
    authAddresses.push(walletBalanceAddress);
    authAddresses.push(userBalanceAddress);
    authAddresses.push(activityAddress);
    let applicationUsers:ApplicationUser[] = [];
    try {
      applicationUsers = await this.getLinkedWalletApplicationUsers(walletLinkAddress);
    } catch (error) {
      // do nothing
    }
    console.log(`applicationUsers=${JSON.stringify(applicationUsers)}`);
    if (applicationUsers.length > 0) {
      for (let i = 0; i < applicationUsers.length; i = i + 1) {
        if (applicationUsers[i].applicationId !== appUser.applicationId || applicationUsers[i].userId !== appUser.userId) {
          authAddresses.push(this.getBalanceStateAddress(applicationUsers[i].applicationId, applicationUsers[i].userId));
          authAddresses.push(this.getActivityLogAddress(applicationUsers[i].userId, applicationUsers[i].applicationId));
        }
      }
    }
    console.log(`authAddresses=${JSON.stringify(authAddresses)}`);
    process.exit(1);
    const params = new any.Any();
    params.setValue(walletToUser.serializeBinary());
    params.setTypeUrl('github.com/propsproject/pending-props/protos/pending_props_pb.WalletToUser');
    const rpcRequest = this.getRPCRequest(params, payload_pb.Method.WALLET_LINK);
    const rpcRequestBytes = rpcRequest.serializeBinary();
    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
        familyName: this.familyName,
        familyVersion: this.familyVersion,
        inputs: authAddresses,
        outputs: authAddresses,
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

  private getLastEthBlockTransaction(privateKey, blockId: number, timestamp: number) {
    // prepare transaction
    // const hashToSign = createHash('sha512').update(issueEarningsDetailsPB.serializeBinary()).digest('hex').toLowerCase();
    // const earningsSignature = TransactionManager.getSigner(privateKey).sign(Buffer.from(hashToSign));
    const lastEthBlock = new payload_pb.LastEthBlock();
    lastEthBlock.setId(blockId);
    lastEthBlock.setTimestamp(timestamp);
    const params = new any.Any();
    params.setValue(lastEthBlock.serializeBinary());
    params.setTypeUrl('github.com/propsproject/pending-props/protos/pending_props_pb.LastEthBlock');
    const rpcRequest = this.getRPCRequest(params, payload_pb.Method.LAST_ETH_BLOCK_UPDATE);
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
  private async getTransaction(privateKey, transaction: Transaction) {
    // prepare transaction
    const params = new any.Any();
    params.setValue(transaction.serializeBinary());
    params.setTypeUrl('github.com/propsproject/pending-props/protos/pending_props_pb.Transaction');
    const rpcRequest = this.getRPCRequest(params, transaction.getType());
    const rpcRequestBytes = rpcRequest.serializeBinary();
    const stateAddress = this.getTransactionStateAddress(transaction.getType(), transaction.getApplicationId(), transaction.getUserId(), transaction.getTimestamp());
    const balanceAddress = this.getBalanceStateAddress(transaction.getApplicationId(), transaction.getUserId());
    const activityAddress = this.getActivityLogAddress(transaction.getUserId(), transaction.getApplicationId());
    // console.log(`****** activityAddress = ${activityAddress}, rewardsDay = ${this.calcRewardsDay(transaction.getTimestamp())}`);
    const stateAddresses = [stateAddress, balanceAddress, activityAddress];
    // get state addresses for walletLinkAddress, and other balances object that may need to update if linked:
    const appUserBalance:AppUserBalance = await this.getBalanceByAppUser(transaction.getApplicationId(), transaction.getUserId());
    if (appUserBalance !== null && 'linkedWallet' in appUserBalance && appUserBalance.linkedWallet.length > 0) {
      const walletBalanceAddress = this.getBalanceStateAddress('', appUserBalance.linkedWallet);
      const walletLinkAddress = this.getWalletLinkAddress(appUserBalance.linkedWallet);      
      stateAddresses.push(walletLinkAddress);
      stateAddresses.push(walletBalanceAddress);      
      const applicationUsers:ApplicationUser[] = await this.getLinkedWalletApplicationUsers(walletLinkAddress);
      for (let i = 0; i < applicationUsers.length; i = i + 1) {
        if (applicationUsers[i].applicationId !== transaction.getApplicationId() || applicationUsers[i].userId !== transaction.getUserId()) {
          stateAddresses.push(this.getBalanceStateAddress(applicationUsers[i].applicationId, applicationUsers[i].userId));
          stateAddresses.push(this.getActivityLogAddress(applicationUsers[i].userId, applicationUsers[i].applicationId));
        }
      }
    }

    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
        familyName: this.familyName,
        familyVersion: this.familyVersion,
        inputs: stateAddresses,
        outputs: stateAddresses,
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


  private getSettlementTransaction(privateKey, settlementData: SettlementData, authAddresses: string[]) {
    const params = new any.Any();
    params.setValue(settlementData.serializeBinary());
    params.setTypeUrl('github.com/propsproject/pending-props/protos/pending_props_pb.SettlementData');
    const rpcRequest = this.getRPCRequest(params, payload_pb.Method.SETTLEMENT);
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

  private getBalanceUpdateTransaction(privateKey, balanceUpdateData: BalanceUpdate, authAddresses: string[]) {
    const balanceUpdate = new payload_pb.BalanceUpdate();
    balanceUpdate.setPublicAddress(TransactionManager.normalizeAddress(balanceUpdateData.address));
    balanceUpdate.setOnchainBalance(balanceUpdateData.balance);
    balanceUpdate.setTxHash(TransactionManager.normalizeAddress(balanceUpdateData.txHash));
    balanceUpdate.setBlockId(balanceUpdateData.blockId);
    balanceUpdate.setTimestamp(TransactionManager.normalizeTimestamp(balanceUpdateData.timestamp));

    const params = new any.Any();
    params.setValue(balanceUpdate.serializeBinary());
    params.setTypeUrl('github.com/propsproject/pending-props/protos/pending_props_pb.BalanceUpdate');
    const rpcRequest = this.getRPCRequest(params, payload_pb.Method.BALANCE_UPDATE);
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

  private async getActivityLogTransaction(privateKey: string, activityLogTransactionPB: any) {

    // const hashToSign = createHash('sha512')
    //   .update(activityLogTransactionPB.serializeBinary())
    //   .digest('hex')
    //   .toLowerCase();

    // const activitySignature = TransactionManager.getSigner(privateKey).sign(Buffer.from(hashToSign));

    const params = new any.Any();
    params.setValue(activityLogTransactionPB.serializeBinary());
    params.setTypeUrl('github.com/propsproject/pending-props/protos/pending_props_pb.ActivityLog');
    const rpcRequest = this.getRPCRequest(params, payload_pb.Method.ACTIVITY_LOG);
    const rpcRequestBytes = rpcRequest.serializeBinary();

    const stateAddresses = [];
    stateAddresses.push(this.getLastEthBlockStateAddress());
    stateAddresses.push(this.getActivityLogAddress(activityLogTransactionPB.getUserId(), activityLogTransactionPB.getApplicationId()));
    stateAddresses.push(this.getBalanceStateAddress(activityLogTransactionPB.getApplicationId(), activityLogTransactionPB.getUserId()));
    
    // get state addresses for walletLinkAddress, and other balances object that may need to update if linked:
    const appUserBalance:AppUserBalance = await this.getBalanceByAppUser(activityLogTransactionPB.getApplicationId(), activityLogTransactionPB.getUserId());
    if (appUserBalance !== null && 'linkedWallet' in appUserBalance && appUserBalance.linkedWallet.length > 0) {
      const walletBalanceAddress = this.getBalanceStateAddress('', appUserBalance.linkedWallet);
      const walletLinkAddress = this.getWalletLinkAddress(appUserBalance.linkedWallet);
      stateAddresses.push(walletLinkAddress);
      stateAddresses.push(walletBalanceAddress);
      const applicationUsers:ApplicationUser[] = await this.getLinkedWalletApplicationUsers(walletLinkAddress);
      for (let i = 0; i < applicationUsers.length; i = i + 1) {
        if (applicationUsers[i].applicationId !== activityLogTransactionPB.getApplicationId() || applicationUsers[i].userId !== activityLogTransactionPB.getUserId()) {
          stateAddresses.push(this.getBalanceStateAddress(applicationUsers[i].applicationId, applicationUsers[i].userId));          
        }
      }
    }



    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
      familyName: this.familyName,
      familyVersion: this.familyVersion,
      inputs: stateAddresses,
      outputs: stateAddresses,
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

  calcRewardsDay(timestamp: number): number {
    const secondsSinceRewardsStartTimestamp = timestamp - this.rewardsStartTimestamp;    
    return Math.floor(secondsSinceRewardsStartTimestamp / this.secondsInDay) + 1;
  }

  getSubmitResponse(): SubmitAPIResponse {
    return this.lastSubmitResponse;
  }
}

export { TransactionManager, SubmitAPIResponse, BatchDetailsTransaction, WalletBalance, ApplicationUser, AppUserBalance };
