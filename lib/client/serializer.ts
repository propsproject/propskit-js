import {Earning, Settlements} from '../proto/earning_pb';

/**
 *  Wrapper class for state query responses that has deserialization utility methods
 *
 * @export
 * @class QueryResults
 */
export class QueryResults {

  constructor(public data : any) {}

  /**
   * Deserialize state query results into an array of earnings
   *
   * @returns {ReadonlyArray < Earning >}
   * @memberof QueryResults
   */
  public toEarnings() : ReadonlyArray < Earning > {
    return this
      .data
      .data
      .map(entry => {
        const bytes : Uint8Array = new Uint8Array(Buffer.from(entry.data, 'base64'));
        return Earning.deserializeBinary(bytes);
      });
  }

  /**
   * Deserialize state query result into an array of settlements
   *
   * @returns {ReadonlyArray < Settlements >}
   * @memberof QueryResults
   */
  public toSettlements() : ReadonlyArray < Settlements > {
    return this
      .data
      .data
      .map(entry => {
        const bytes : Uint8Array = new Uint8Array(Buffer.from(entry.data, 'base64'));
        return Settlements.deserializeBinary(bytes);
      });
  }

  /**
   * get state query data how it was passed
   *
   * @returns {*}
   * @memberof QueryResults
   */
  public raw() : any {return this.data;}
};
