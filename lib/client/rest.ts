import * as request from 'superagent';
import { RPCRequest } from '../proto/payload_pb';
import { Batch, BatchHeader, BatchList } from '../sawtooth-sdk-ts/batch_pb';
import { Transaction, TransactionHeader } from '../sawtooth-sdk-ts/transaction_pb';
import { Config } from './config';
import { QueryResults } from './serializer';

/**
 *
 *
 * @export
 * @class RestEndpoints
 */
export class RestEndpoints {
  public readonly batches : string;
  public readonly state : string;

  /**
   * Creates an instance of RestEndpoints.
   * @param {string} uri uri to the REST API
   * @memberof RestEndpoints
   */
  constructor(public readonly uri : string) {
    this.batches = `${uri}/batches`;
    this.state = `${uri}/state`;
  }
}

/**
 *
 *
 * @export
 * @class TransactionData
 */
// tslint:disable-next-line:max-classes-per-file
export class TransactionData {
  /**
   *  Creates an instance of TransactionData.
   * @param {TransactionHeader} header transaction header ready for signing and submission
   * @param {RPCRequest} request  rpc request ready for signing and submission
   * @memberof TransactionData
   */
  // tslint:disable-next-line:no-shadowed-variable
  constructor(readonly header : TransactionHeader, readonly request : RPCRequest) {}
}

/**
 * Create a new RestClient
 *
 * ### Example (es imports)
 * ```js
 * import { sha256 } from 'typescript-starter'
 * sha256('test')
 * // => '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
 * ```
 *
 * @export
 * @class TransactionData
 */
// tslint:disable-next-line:max-classes-per-file
export class RestClient {

  public readonly config : Config;

  // tslint:disable-next-line:readonly-keyword
  public endpoints : RestEndpoints;
  // tslint:disable-next-line:readonly-keyword
  public HEADERS : any = {
    applicationJSON: 'application/json',
    applicationOctetStream: 'application/octet-stream',
    contentLength: 'Content-Length',
    contentType: 'Content-Type',
  };

  /**
   *  Creates an instance of RestClient.
   * @param {ClientConfig} config
   * @memberof RestClient
   */
  constructor(public readonly uri : string, readonly privateKeyHex : string) {
    this.endpoints = new RestEndpoints(uri);
    this.config = new Config(uri, privateKeyHex);
  }

  /**
   *  Submits an array of transactions as a batch the the chain
   *
   * @param {ReadonlyArray < TransactionData >} transactionData
   * @returns {Promise < any >}
   * @memberof RestClient
   */
  public async submitBatches(transactionData : ReadonlyArray < TransactionData >) : Promise < any > {
    try {
      const batchData = transactionData.map(data => {
        data
          .header
          .setBatcherPublicKey(this.config.signer.publickeyAsHex);

        const signature : string = this
          .config
          .signer
          .sign(data.header.serializeBinary());

        const transaction : Transaction = new Transaction();
        transaction.setHeader(data.header.serializeBinary());
        transaction.setHeaderSignature(signature);
        transaction.setPayload(data.request.serializeBinary());
        return transaction;
      });

      const batchHeader : BatchHeader = new BatchHeader();
      batchHeader.setTransactionIdsList(batchData.map(transaction => transaction.getHeaderSignature()));
      batchHeader.setSignerPublicKey(this.config.signer.publickeyAsHex);
      const batchHeaderSig = this
        .config
        .signer
        .sign(batchHeader.serializeBinary());

      const batch : Batch = new Batch();
      batch.setHeader(batchHeader.serializeBinary());
      batch.setHeaderSignature(batchHeaderSig);
      batch.setTransactionsList(batchData.map(transaction => transaction));

      const batchList : BatchList = new BatchList();
      batchList.setBatchesList([batch]);

      return await this.submitBatchList(batchList);
    } catch (error) {
      return error;
    }
  }

  /**
   * Query the chain state
   *
   * @param {string} address state address for the query
   * @returns {Promise < any >}
   * @memberof RestClient
   */
  public async stateQuery(address : string) : Promise < any > {
    try {
      const response = await request
        .get(this.endpoints.state)
        .ok(res => res.status < 300)
        .set(this.HEADERS.contentType, this.HEADERS.applicationJSON)
        .query({ address });
      return new QueryResults(response.body);
    } catch (error) {
      throw error.response
        ? new Error(error.response.text)
        : error;
    }
  }

  /**
   * Submit a list of batches to the chain
   *
   * @param {BatchList} list
   * @returns {Promise < any >}
   * @memberof RestClient
   */
  public async submitBatchList(list : BatchList) : Promise < any > {
    try {
      const data : Uint8Array = list.serializeBinary();
      const response = await request
        .post(this.endpoints.batches)
        .ok(res => res.status < 300)
        .set(this.HEADERS.contentType, this.HEADERS.applicationOctetStream)
        .set(this.HEADERS.contentLength, `${data.length}`)
        .send(Buffer.from(data));

      return response.body;
    } catch (error) {
      throw error.response
        ? new Error(error.response.text)
        : error;
    }
  }
};
