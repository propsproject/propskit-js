import { BalanceEvent, TransactionEvent } from '../../proto/events_pb';
import { Event } from '../../sawtooth-sdk-ts/events_pb';
import { StateChangeList, StateChange } from '../../sawtooth-sdk-ts/transaction_receipt_pb';
const payload_pb = require('../../proto/payload_pb');
const balance_pb = require('../../proto/balance_pb');
const users_pb = require('../../proto/users_pb');
const transaction_pb = require('../../proto/transaction_pb');
const activity_pb = require('../../proto/activity_pb');
const _ = require('lodash');


export const stateAddressDataToJSONObject = (bytes: any, blockData: any) : any => {  
  const changeEvent = StateChangeList.deserializeBinary(bytes);    
  const changeList = changeEvent.getStateChangesList();
  const returnObj = {};
  returnObj['changes'] = [];
  for (let i:number = 0; i < changeList.length; i += 1) {
    const stateAddress: string = changeList[i].getAddress();
    const data:Uint8Array = changeList[i].getValue_asU8();
    const type: string = changeList[i].getType() === StateChange.Type.SET ? 'SET' : 'DELETE';
    const prefix = stateAddress.substr(0,6);  
    let pb;
    let obj;
    switch (prefix) {
      case '8d7eed':
        pb = new payload_pb.LastEthBlock.deserializeBinary(data); 
        obj = { stateAddress, type, dataType: 'LastEthBlock', dataValue: type === 'SET' ? pb.toObject() : {}, rawValue: changeList[i].getValue_asB64() };        
        break;
      case '2ddf6c':
        pb = new activity_pb.ActivityLog.deserializeBinary(data);
        obj = { stateAddress, type, dataType: 'ActivityLog', dataValue: type === 'SET' ? pb.toObject() : {}, rawValue: changeList[i].getValue_asB64() };
        break;
      case '383dea':
        pb = new payload_pb.BalanceUpdate.deserializeBinary(data);
        obj = { stateAddress, type, dataType: 'BalanceUpdate', dataValue: type === 'SET' ? pb.toObject() : {}, rawValue: changeList[i].getValue_asB64() };
        break;
      case '4de48f':
        pb = new payload_pb.SettlementData.deserializeBinary(data);
        obj = { stateAddress, type, dataType: 'SettlementData', dataValue: type === 'SET' ? pb.toObject() : {}, rawValue: changeList[i].getValue_asB64() };
        break;
      case 'ec00a6':
        pb = new balance_pb.Balance.deserializeBinary(data);
        obj = { stateAddress, type, dataType: 'Balance', dataValue: type === 'SET' ? pb.toObject() : {}, rawValue: changeList[i].getValue_asB64() };
        break;
      case '23659c':
        pb = new users_pb.WalletToUser.deserializeBinary(data);
        obj = { stateAddress, type, dataType: 'WalletToUser', dataValue: type === 'SET' ? pb.toObject() : {}, rawValue: changeList[i].getValue_asB64() };
        break;
      case 'bd88c6':
        pb = new transaction_pb.Transaction.deserializeBinary(data);
        obj = { stateAddress, type, dataType: 'Transaction', dataValue: type === 'SET' ? pb.toObject() : {}, rawValue: changeList[i].getValue_asB64() };
        break;
      default: 
        obj = { stateAddress, type, dataType: 'Unknown', dataValue: {}, rawValue: changeList[i].getValue_asB64() };
        ;
    }
    
    returnObj['changes'].push(_.merge(obj, blockData));
  }

  return returnObj;
};

export class DecodedTransactionEvent {
    /**
     * Creates an instance of DecodedTransactionEvent.
     * @param {string} application application id that issued the earning
     * @param {string} recipient user id that earning was issued to
     * @param {string} description description/reason for why it was issued
     * @param {TransactionEvent} transactionEvent transaction event
     * @param {string} transactionType type of action that took place (ISSUE, REVOKE, SETTLE)
     * @param {ReadonlyArray < Event.Attribute >} attributes attributes of the earning event
     * @memberof DecodedTransactionEvent
     */
  constructor(readonly application : string, readonly recipient : string, readonly description : string, readonly transactionEvent : TransactionEvent, readonly transactionType : string, readonly attributes : ReadonlyArray < Event.Attribute >) {}
}

/**
 * Decodes an earning event adding top level entries into an about for all data
 *
 * @param {Event} e earning event that will be decoded
 * @returns {DecodedTransactionEvent}
 */
export const decodeTransactionEvent = (e : Event) : DecodedTransactionEvent => {
  const transactionEvent: TransactionEvent = TransactionEvent.deserializeBinary(e.getData_asU8());
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
    transactionEvent,
    transactionType: e
      .getAttributesList()
      .find(a => a.getKey() === 'transaction_type')
      .getValue(),
    recipient: e
      .getAttributesList()
      .find(a => a.getKey() === 'recipient')
      .getValue(),
    stateAddress: transactionEvent.getStateaddress(),
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
 * Decodes a block commit event adding top level entries into an about for all data
 *
 * @param {Event} e block commit event that will be decoded
 * @returns {DecodedBlockCommit}
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

export const decodeStateDelta = (e : Event, blockData: any) : any => {
  // const eventAttributes = e
  //   .getAttributesList()
  //   .reduce((prev, curr) => {
  //     // tslint:disable-next-line:no-object-mutation
  //     prev[curr.getKey()] = curr.getValue();
  //     return prev;
  //   },      {});    
  console.log(`************* decodeStateDelta = ${JSON.stringify(blockData)}`);
  return stateAddressDataToJSONObject(e.getData_asU8(), blockData);
  // tslint:disable-next-line:no-string-literal  
  // return { eventAttributes, data:e.getData() };// new DecodedBlockCommit(block['block_id'], block['block_num'], block['state_root_hash'], block['previous_block_id']);
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


// tslint:disable-next-line:max-classes-per-file
export class DecodedWalletLinkedEvent {
  /**
   * Creates an instance of DecodedWalletLinkedEvent.
   * This class is used for both WalletLinked and WalletUnlinked events, check event_type for the type
   *
   * @param {string} address Address of the wallet linked
   * @param {string} recipient The recepient (userId)
   * @param {string} application The application id
   * @param {string} signature The signature used to sign the wallet linking
   * @param {ReadonlyArray < Event.Attribute >} attributes attributes of the balance event
   * @memberof DecodedWalletLinkedEvent
   */
  constructor(readonly address : string, readonly recipient: string, readonly application: string, readonly signature: string, readonly attributes: ReadonlyArray < Event.Attribute >) {}
}

export const decodeWalletLinkedEvent = (e : Event) : DecodedWalletLinkedEvent => {
  return Object.freeze({
    attributes: e.getAttributesList(),
    eventType: e
      .getAttributesList()
      .find(a => a.getKey() === 'event_type')
      .getValue(),
    recipient: e
      .getAttributesList()
      .find(a => a.getKey() === 'recipient')
      .getValue(),
    address: e
      .getAttributesList()
      .find(a => a.getKey() === 'address')
      .getValue(),
    application: e
      .getAttributesList()
      .find(a => a.getKey() === 'application')
      .getValue(),
    signature: e
      .getAttributesList()
      .find(a => a.getKey() === 'signature')
      .getValue(),
  });
};
