// package: pending_props_pb
// file: earning.proto

import * as jspb from "google-protobuf";

export class Earning extends jspb.Message {
  hasDetails(): boolean;
  clearDetails(): void;
  getDetails(): EarningDetails | undefined;
  setDetails(value?: EarningDetails): void;

  getSignature(): string;
  setSignature(value: string): void;

  getSettledByTransaction(): string;
  setSettledByTransaction(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Earning.AsObject;
  static toObject(includeInstance: boolean, msg: Earning): Earning.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Earning, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Earning;
  static deserializeBinaryFromReader(message: Earning, reader: jspb.BinaryReader): Earning;
}

export namespace Earning {
  export type AsObject = {
    details?: EarningDetails.AsObject,
    signature: string,
    settledByTransaction: string,
  }
}

export class EarningDetails extends jspb.Message {
  getTimestamp(): number;
  setTimestamp(value: number): void;

  getAmountEarned(): string;
  setAmountEarned(value: string): void;

  getAmountSettled(): string;
  setAmountSettled(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  getApplicationId(): string;
  setApplicationId(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getStatus(): Status;
  setStatus(value: Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EarningDetails.AsObject;
  static toObject(includeInstance: boolean, msg: EarningDetails): EarningDetails.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EarningDetails, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EarningDetails;
  static deserializeBinaryFromReader(message: EarningDetails, reader: jspb.BinaryReader): EarningDetails;
}

export namespace EarningDetails {
  export type AsObject = {
    timestamp: number,
    amountEarned: string,
    amountSettled: string,
    userId: string,
    applicationId: string,
    description: string,
    status: Status,
  }
}

export class Settlements extends jspb.Message {
  clearEarningAddressesList(): void;
  getEarningAddressesList(): Array<string>;
  setEarningAddressesList(value: Array<string>): void;
  addEarningAddresses(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Settlements.AsObject;
  static toObject(includeInstance: boolean, msg: Settlements): Settlements.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Settlements, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Settlements;
  static deserializeBinaryFromReader(message: Settlements, reader: jspb.BinaryReader): Settlements;
}

export namespace Settlements {
  export type AsObject = {
    earningAddressesList: Array<string>,
  }
}

export class LastEthBlock extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LastEthBlock.AsObject;
  static toObject(includeInstance: boolean, msg: LastEthBlock): LastEthBlock.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LastEthBlock, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LastEthBlock;
  static deserializeBinaryFromReader(message: LastEthBlock, reader: jspb.BinaryReader): LastEthBlock;
}

export namespace LastEthBlock {
  export type AsObject = {
    id: number,
    timestamp: number,
  }
}

export class Nonce extends jspb.Message {
  getCurrent(): number;
  setCurrent(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Nonce.AsObject;
  static toObject(includeInstance: boolean, msg: Nonce): Nonce.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Nonce, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Nonce;
  static deserializeBinaryFromReader(message: Nonce, reader: jspb.BinaryReader): Nonce;
}

export namespace Nonce {
  export type AsObject = {
    current: number,
  }
}

export enum Status {
  PENDING = 0,
  REVOKED = 1,
  SETTLED = 2,
  ERROR = 3,
}

