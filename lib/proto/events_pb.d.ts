// package: pending_props_pb
// file: events.proto

import * as jspb from "google-protobuf";
import * as earning_pb from "./earning_pb";
import * as balance_pb from "./balance_pb";

export class EarningEvent extends jspb.Message {
  hasEarning(): boolean;
  clearEarning(): void;
  getEarning(): earning_pb.Earning | undefined;
  setEarning(value?: earning_pb.Earning): void;

  getIssueaddress(): string;
  setIssueaddress(value: string): void;

  getRevokeaddress(): string;
  setRevokeaddress(value: string): void;

  getSettleaddress(): string;
  setSettleaddress(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EarningEvent.AsObject;
  static toObject(includeInstance: boolean, msg: EarningEvent): EarningEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EarningEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EarningEvent;
  static deserializeBinaryFromReader(message: EarningEvent, reader: jspb.BinaryReader): EarningEvent;
}

export namespace EarningEvent {
  export type AsObject = {
    earning?: earning_pb.Earning.AsObject,
    issueaddress: string,
    revokeaddress: string,
    settleaddress: string,
    message: string,
  }
}

export class BalanceEvent extends jspb.Message {
  hasBalance(): boolean;
  clearBalance(): void;
  getBalance(): balance_pb.Balance | undefined;
  setBalance(value?: balance_pb.Balance): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BalanceEvent.AsObject;
  static toObject(includeInstance: boolean, msg: BalanceEvent): BalanceEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BalanceEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BalanceEvent;
  static deserializeBinaryFromReader(message: BalanceEvent, reader: jspb.BinaryReader): BalanceEvent;
}

export namespace BalanceEvent {
  export type AsObject = {
    balance?: balance_pb.Balance.AsObject,
    message: string,
  }
}

export class LastEthBlockEvent extends jspb.Message {
  getBlockid(): number;
  setBlockid(value: number): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LastEthBlockEvent.AsObject;
  static toObject(includeInstance: boolean, msg: LastEthBlockEvent): LastEthBlockEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LastEthBlockEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LastEthBlockEvent;
  static deserializeBinaryFromReader(message: LastEthBlockEvent, reader: jspb.BinaryReader): LastEthBlockEvent;
}

export namespace LastEthBlockEvent {
  export type AsObject = {
    blockid: number,
    message: string,
  }
}

export enum EventType {
  EARNINGISSUED = 0,
  EARNINGREVOKED = 1,
  EARNINGSETTLED = 2,
  BALANCEUPDATED = 3,
  LASTETHBLOCKUPDATED = 4,
}

