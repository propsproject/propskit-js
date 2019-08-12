// package: pending_props_pb
// file: balance.proto

import * as jspb from "google-protobuf";

export class BalanceDetails extends jspb.Message {
  getPending(): string;
  setPending(value: string): void;

  getTotalPending(): string;
  setTotalPending(value: string): void;

  getTransferable(): string;
  setTransferable(value: string): void;

  getBonded(): string;
  setBonded(value: string): void;

  getDelegated(): string;
  setDelegated(value: string): void;

  getDelegatedto(): string;
  setDelegatedto(value: string): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  getLastEthBlockId(): number;
  setLastEthBlockId(value: number): void;

  getLastUpdateType(): UpdateType;
  setLastUpdateType(value: UpdateType): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BalanceDetails.AsObject;
  static toObject(includeInstance: boolean, msg: BalanceDetails): BalanceDetails.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BalanceDetails, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BalanceDetails;
  static deserializeBinaryFromReader(message: BalanceDetails, reader: jspb.BinaryReader): BalanceDetails;
}

export namespace BalanceDetails {
  export type AsObject = {
    pending: string,
    totalPending: string,
    transferable: string,
    bonded: string,
    delegated: string,
    delegatedto: string,
    timestamp: number,
    lastEthBlockId: number,
    lastUpdateType: UpdateType,
  }
}

export class Balance extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getApplicationId(): string;
  setApplicationId(value: string): void;

  hasBalanceDetails(): boolean;
  clearBalanceDetails(): void;
  getBalanceDetails(): BalanceDetails | undefined;
  setBalanceDetails(value?: BalanceDetails): void;

  hasPreCutoffDetails(): boolean;
  clearPreCutoffDetails(): void;
  getPreCutoffDetails(): BalanceDetails | undefined;
  setPreCutoffDetails(value?: BalanceDetails): void;

  getType(): BalanceType;
  setType(value: BalanceType): void;

  getLinkedWallet(): string;
  setLinkedWallet(value: string): void;

  getBalanceUpdateIndex(): number;
  setBalanceUpdateIndex(value: number): void;

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
    userId: string,
    applicationId: string,
    balanceDetails?: BalanceDetails.AsObject,
    preCutoffDetails?: BalanceDetails.AsObject,
    type: BalanceType,
    linkedWallet: string,
    balanceUpdateIndex: number,
  }
}

export enum BalanceType {
  USER = 0,
  WALLET = 1,
}

export enum UpdateType {
  PENDING_PROPS_BALANCE = 0,
  PROPS_BALANCE = 1,
  WALLET_LINK_BALANCE = 2,
}

