// package: pending_props_pb
// file: events.proto

import * as jspb from "google-protobuf";
import * as earning_pb from "./earning_pb";
import * as balance_pb from "./balance_pb";
import * as users_pb from "./users_pb";

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

  getDescription(): string;
  setDescription(value: string): void;

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
    description: string,
  }
}

export class BalanceEvent extends jspb.Message {
  hasBalance(): boolean;
  clearBalance(): void;
  getBalance(): balance_pb.Balance | undefined;
  setBalance(value?: balance_pb.Balance): void;

  getMessage(): string;
  setMessage(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

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
    description: string,
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

export class WalletLinkedEvent extends jspb.Message {
  hasUser(): boolean;
  clearUser(): void;
  getUser(): users_pb.ApplicationUser | undefined;
  setUser(value?: users_pb.ApplicationUser): void;

  hasWallettousers(): boolean;
  clearWallettousers(): void;
  getWallettousers(): users_pb.WalletToUser | undefined;
  setWallettousers(value?: users_pb.WalletToUser): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WalletLinkedEvent.AsObject;
  static toObject(includeInstance: boolean, msg: WalletLinkedEvent): WalletLinkedEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WalletLinkedEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WalletLinkedEvent;
  static deserializeBinaryFromReader(message: WalletLinkedEvent, reader: jspb.BinaryReader): WalletLinkedEvent;
}

export namespace WalletLinkedEvent {
  export type AsObject = {
    user?: users_pb.ApplicationUser.AsObject,
    wallettousers?: users_pb.WalletToUser.AsObject,
    message: string,
  }
}

export class WalletUnlinkedEvent extends jspb.Message {
  hasUser(): boolean;
  clearUser(): void;
  getUser(): users_pb.ApplicationUser | undefined;
  setUser(value?: users_pb.ApplicationUser): void;

  hasWallettousers(): boolean;
  clearWallettousers(): void;
  getWallettousers(): users_pb.WalletToUser | undefined;
  setWallettousers(value?: users_pb.WalletToUser): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WalletUnlinkedEvent.AsObject;
  static toObject(includeInstance: boolean, msg: WalletUnlinkedEvent): WalletUnlinkedEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WalletUnlinkedEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WalletUnlinkedEvent;
  static deserializeBinaryFromReader(message: WalletUnlinkedEvent, reader: jspb.BinaryReader): WalletUnlinkedEvent;
}

export namespace WalletUnlinkedEvent {
  export type AsObject = {
    user?: users_pb.ApplicationUser.AsObject,
    wallettousers?: users_pb.WalletToUser.AsObject,
    message: string,
  }
}

export enum EventType {
  EARNINGISSUED = 0,
  EARNINGREVOKED = 1,
  EARNINGSETTLED = 2,
  BALANCEUPDATED = 3,
  LASTETHBLOCKUPDATED = 4,
  WALLETLINKED = 5,
  WALLETUNLINKED = 6,
}

