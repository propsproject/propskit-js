// package: pending_props_pb
// file: users.proto

import * as jspb from "google-protobuf";

export class ApplicationUser extends jspb.Message {
  getApplicationId(): string;
  setApplicationId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  getSignature(): string;
  setSignature(value: string): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ApplicationUser.AsObject;
  static toObject(includeInstance: boolean, msg: ApplicationUser): ApplicationUser.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ApplicationUser, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ApplicationUser;
  static deserializeBinaryFromReader(message: ApplicationUser, reader: jspb.BinaryReader): ApplicationUser;
}

export namespace ApplicationUser {
  export type AsObject = {
    applicationId: string,
    userId: string,
    signature: string,
    timestamp: number,
  }
}

export class WalletToUser extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  clearUsersList(): void;
  getUsersList(): Array<ApplicationUser>;
  setUsersList(value: Array<ApplicationUser>): void;
  addUsers(value?: ApplicationUser, index?: number): ApplicationUser;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WalletToUser.AsObject;
  static toObject(includeInstance: boolean, msg: WalletToUser): WalletToUser.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WalletToUser, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WalletToUser;
  static deserializeBinaryFromReader(message: WalletToUser, reader: jspb.BinaryReader): WalletToUser;
}

export namespace WalletToUser {
  export type AsObject = {
    address: string,
    usersList: Array<ApplicationUser.AsObject>,
  }
}

