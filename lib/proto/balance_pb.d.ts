// package: pending_props_pb
// file: balance.proto

import * as jspb from "google-protobuf";

export class Balance extends jspb.Message {
  getRecipientPublicAddress(): string;
  setRecipientPublicAddress(value: string): void;

  getPending(): string;
  setPending(value: string): void;

  getTotal(): string;
  setTotal(value: string): void;

  getLastTimestamp(): number;
  setLastTimestamp(value: number): void;

  getLastEthBlockId(): number;
  setLastEthBlockId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Balance.AsObject;
  static toObject(includeInstance: boolean, msg: Balance): Balance.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Balance, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Balance;
  static deserializeBinaryFromReader(message: Balance, reader: jspb.BinaryReader): Balance;
}

export namespace Balance {
  export type AsObject = {
    recipientPublicAddress: string,
    pending: string,
    total: string,
    lastTimestamp: number,
    lastEthBlockId: number,
  }
}

export class BalanceTimestamp extends jspb.Message {
  getTimestamp(): number;
  setTimestamp(value: number): void;

  hasBalance(): boolean;
  clearBalance(): void;
  getBalance(): Balance | undefined;
  setBalance(value?: Balance): void;

  getUpdatetype(): UpdateType;
  setUpdatetype(value: UpdateType): void;

  getBlockId(): number;
  setBlockId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BalanceTimestamp.AsObject;
  static toObject(includeInstance: boolean, msg: BalanceTimestamp): BalanceTimestamp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BalanceTimestamp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BalanceTimestamp;
  static deserializeBinaryFromReader(message: BalanceTimestamp, reader: jspb.BinaryReader): BalanceTimestamp;
}

export namespace BalanceTimestamp {
  export type AsObject = {
    timestamp: number,
    balance?: Balance.AsObject,
    updatetype: UpdateType,
    blockId: number,
  }
}

export enum UpdateType {
  PENDING_PROPS_BALANCE = 0,
  PROPS_BALANCE = 1,
}

