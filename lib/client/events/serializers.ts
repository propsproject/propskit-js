import { BalanceEvent, EarningEvent } from '../../proto/events_pb';
import { Event } from '../../sawtooth-sdk-ts/events_pb';

export class DecodedEarningEvent {
    /**
     * Creates an instance of DecodedEarningEvent.
     * @param {string} application application id that issued the earning
     * @param {string} recipient user id that earning was issued to
     * @param {string} description description/reason for why it was issued
     * @param {EarningEvent} earningEvent earning event
     * @param {string} eventType type of action that took place (ISSUE, REVOKE, SETTLE)
     * @param {ReadonlyArray < Event.Attribute >} attributes attributes of the earning event
     * @memberof DecodedEarningEvent
     */
  constructor(readonly application : string, readonly recipient : string, readonly description : string, readonly earningEvent : EarningEvent, readonly eventType : string, readonly attributes : ReadonlyArray < Event.Attribute >) {}
}

/**
 * Decodes an earning event adding top level entries into an about for all data
 *
 * @param {Event} e earning event that will be decoded
 * @returns {DecodedEarningEvent}
 */
export const decodeEarningEvent = (e : Event) : DecodedEarningEvent => {
  const obj = {
    application: e
      .getAttributesList()
      .find(a => a.getKey() === 'application')
      .getValue(),
    attributes: e.getAttributesList(),
    description: e
      .getAttributesList()
      .find(a => a.getKey() === 'description')
      .getValue(),
    earningEvent: EarningEvent.deserializeBinary(e.getData_asU8()),
    eventType: e
      .getAttributesList()
      .find(a => a.getKey() === 'event_type')
      .getValue(),
    recipient: e
      .getAttributesList()
      .find(a => a.getKey() === 'recipient')
      .getValue(),
  };
  return Object.freeze(obj);
};

/**
 *
 *
 * @export
 * @class DecodedBlockCommit
 */
// tslint:disable-next-line:max-classes-per-file
export class DecodedBlockCommit {
    /**
     * Creates an instance of DecodedBlockCommit.
     * @param {string} blockID
     * @param {number} blockNum
     * @param {string} stateRootHash
     * @param {string} previousBlock
     * @memberof DecodedBlockCommit
     */
  constructor(public blockID : string, public blockNum : number, public stateRootHash : string, public previousBlock : string) {}
}

/**
 * Decodes an earning event adding top level entries into an about for all data
 *
 * @param {Event} e earning event that will be decoded
 * @returns {DecodedEarningEvent}
 */
export const decodeBlockCommit = (e : Event) : DecodedBlockCommit => {
  const block = e
    .getAttributesList()
    .reduce((prev, curr) => {
      // tslint:disable-next-line:no-object-mutation
      prev[curr.getKey()] = curr.getValue();
      return prev;
    },      {});

  // tslint:disable-next-line:no-string-literal
  return new DecodedBlockCommit(block['block_id'], block['block_num'], block['state_root_hash'], block['previous_block_id']);
};

// tslint:disable-next-line:max-classes-per-file
export class DecodedBalanceEvent {
    /**
     * Creates an instance of DecodedBalanceEvent.     
     * @param {string} recipient ethereum address balance of changed
     * @param {BalanceEvent} balanceEvent balance event     
     * @param {ReadonlyArray < Event.Attribute >} attributes attributes of the balance event
     * @memberof DecodedBalanceEvent
     */
  constructor(readonly recipient : string, readonly balanceEvent : BalanceEvent, readonly attributes : ReadonlyArray < Event.Attribute >) {}
}

/**
 * Decodes a balance event adding top level entries into an about for all data
 *
 * @param {Event} e balance event that will be decoded
 * @returns {DecodedBalanceEvent}
 */
export const decodeBalanceEvent = (e : Event) : DecodedBalanceEvent => {
  return Object.freeze({        
    attributes: e.getAttributesList(),
    balanceEvent: BalanceEvent.deserializeBinary(e.getData_asU8()),
    eventType: e
      .getAttributesList()
      .find(a => a.getKey() === 'event_type')
      .getValue(),
    recipient: e
      .getAttributesList()
      .find(a => a.getKey() === 'recipient')
      .getValue(),
  });
};
