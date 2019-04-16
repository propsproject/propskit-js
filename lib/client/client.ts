import { AddressBuilder, Secp256k1Signer } from '../common';
import { Earning } from '../proto/earning_pb';
import { earningAddress, EarningsTransactor, getBalanceAddress, NamespacePrefixes, settlementAddress } from '../pending-props';
import { Config } from './config';
import { Subscriber } from './events';
import { RestClient, TransactionData } from './rest';

/**
 *
 *
 * @export
 * @class Client
 * @extends {RestClient}
 */
export class Client extends RestClient {

  /**
   *
   *
   * @type {Config} configuration
   * @memberof Client
   */
  public readonly config : Config;
  /**
   *
   *
   * @type {EarningsTransactor} handles earnings transactions
   * @memberof Client
   */
  public readonly earnings : EarningsTransactor;
  /**
   *
   *
   * @type {*}
   * @memberof Client
   */
  public readonly earningsAddrUtils : any;

  // tslint:disable-next-line:readonly-keyword readonly-array  
  public transactionList : TransactionData[] = [];

  /**
   * Creates an instance of Client.
   * @param {string} uri REST API endpoint
   * @param {string} privateKeyHex hex encoded private key string
   * @memberof Client
   */
  constructor(public readonly uri : string, public readonly privateKeyHex : string) {
    super(uri, privateKeyHex);
    this.config = new Config(uri, privateKeyHex);
    this.earnings = new EarningsTransactor(this.config.signer.publickeyAsHex, this.putTransaction.bind(this));
    this.earningsAddrUtils = {
      earningAddress,
      getBalanceAddress,      
      settlementAddress,      
    };
  }

  /**
   * Get a new event Subscriber
   *
   * @param {string} validator
   * @param {*} onError
   * @returns {Subscriber}
   * @memberof Client
   */
  public subscriber(validator : string, onConnect : any, onDisconnect : any, onError : any) : Subscriber {
    return new Subscriber(validator, onConnect, onDisconnect, onError);
  }

  /**
   *
   *
   * @param {TransactionData} transaction
   * @returns {Client}
   * @memberof Client
   */
  public putTransaction(transaction : TransactionData) : Client {
    this
      .transactionList
      .push(transaction);
    return this;
  }

  /**
   * Submits all transactions currently in this.transactionList to the chain in a single batch. Transaction list is then emptied.
   *
   * @returns {Promise < any >}
   * @memberof Client
   */
  public async submitNextBatch() : Promise < any > {
    const transactions = this
      .transactionList
      .map(t => t);
    // tslint:disable-next-line:no-object-mutation
    this.transactionList.length = 0;
    return this.submitBatches(transactions);
  }

  public async getPendingAddresses(recipient : string, application : string) : Promise < ReadonlyArray < Earning >> {
    try {
      const queryAddress : string = AddressBuilder(NamespacePrefixes.pending())
        .addPart(AddressBuilder('').normalizeAddress(recipient), 0, 4)
        .addPart(AddressBuilder('').normalizeAddress(application), 0, 4)
        .build();

      const data = await this.stateQuery(queryAddress);
      return data.toEarnings();
    } catch (err) {
      return err;
    }
  }

  get signer() : Secp256k1Signer {return this.config.signer;}
};
