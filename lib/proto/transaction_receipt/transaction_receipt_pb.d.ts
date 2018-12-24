// package: 
// file: transaction_receipt.proto

import * as jspb from "google-protobuf";
import * as events_pb from "./events_pb";

export class TransactionReceipt extends jspb.Message {
  clearStateChangesList(): void;
  getStateChangesList(): Array<StateChange>;
  setStateChangesList(value: Array<StateChange>): void;
  addStateChanges(value?: StateChange, index?: number): StateChange;

  clearEventsList(): void;
  getEventsList(): Array<events_pb.Event>;
  setEventsList(value: Array<events_pb.Event>): void;
  addEvents(value?: events_pb.Event, index?: number): events_pb.Event;

  clearDataList(): void;
  getDataList(): Array<Uint8Array | string>;
  getDataList_asU8(): Array<Uint8Array>;
  getDataList_asB64(): Array<string>;
  setDataList(value: Array<Uint8Array | string>): void;
  addData(value: Uint8Array | string, index?: number): Uint8Array | string;

  getTransactionId(): string;
  setTransactionId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionReceipt.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionReceipt): TransactionReceipt.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransactionReceipt, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionReceipt;
  static deserializeBinaryFromReader(message: TransactionReceipt, reader: jspb.BinaryReader): TransactionReceipt;
}

export namespace TransactionReceipt {
  export type AsObject = {
    stateChangesList: Array<StateChange.AsObject>,
    eventsList: Array<events_pb.Event.AsObject>,
    dataList: Array<Uint8Array | string>,
    transactionId: string,
  }
}

export class StateChange extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  getValue(): Uint8Array | string;
  getValue_asU8(): Uint8Array;
  getValue_asB64(): string;
  setValue(value: Uint8Array | string): void;

  getType(): StateChange.Type;
  setType(value: StateChange.Type): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StateChange.AsObject;
  static toObject(includeInstance: boolean, msg: StateChange): StateChange.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StateChange, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StateChange;
  static deserializeBinaryFromReader(message: StateChange, reader: jspb.BinaryReader): StateChange;
}

export namespace StateChange {
  export type AsObject = {
    address: string,
    value: Uint8Array | string,
    type: StateChange.Type,
  }

  export enum Type {
    TYPE_UNSET = 0,
    SET = 1,
    DELETE = 2,
  }
}

export class StateChangeList extends jspb.Message {
  clearStateChangesList(): void;
  getStateChangesList(): Array<StateChange>;
  setStateChangesList(value: Array<StateChange>): void;
  addStateChanges(value?: StateChange, index?: number): StateChange;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StateChangeList.AsObject;
  static toObject(includeInstance: boolean, msg: StateChangeList): StateChangeList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StateChangeList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StateChangeList;
  static deserializeBinaryFromReader(message: StateChangeList, reader: jspb.BinaryReader): StateChangeList;
}

export namespace StateChangeList {
  export type AsObject = {
    stateChangesList: Array<StateChange.AsObject>,
  }
}

