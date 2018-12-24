// package: 
// file: state_context.proto

import * as jspb from "google-protobuf";
import * as events_pb from "./events_pb";

export class TpStateEntry extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TpStateEntry.AsObject;
  static toObject(includeInstance: boolean, msg: TpStateEntry): TpStateEntry.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TpStateEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TpStateEntry;
  static deserializeBinaryFromReader(message: TpStateEntry, reader: jspb.BinaryReader): TpStateEntry;
}

export namespace TpStateEntry {
  export type AsObject = {
    address: string,
    data: Uint8Array | string,
  }
}

export class TpStateGetRequest extends jspb.Message {
  getContextId(): string;
  setContextId(value: string): void;

  clearAddressesList(): void;
  getAddressesList(): Array<string>;
  setAddressesList(value: Array<string>): void;
  addAddresses(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TpStateGetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TpStateGetRequest): TpStateGetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TpStateGetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TpStateGetRequest;
  static deserializeBinaryFromReader(message: TpStateGetRequest, reader: jspb.BinaryReader): TpStateGetRequest;
}

export namespace TpStateGetRequest {
  export type AsObject = {
    contextId: string,
    addressesList: Array<string>,
  }
}

export class TpStateGetResponse extends jspb.Message {
  clearEntriesList(): void;
  getEntriesList(): Array<TpStateEntry>;
  setEntriesList(value: Array<TpStateEntry>): void;
  addEntries(value?: TpStateEntry, index?: number): TpStateEntry;

  getStatus(): TpStateGetResponse.Status;
  setStatus(value: TpStateGetResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TpStateGetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TpStateGetResponse): TpStateGetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TpStateGetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TpStateGetResponse;
  static deserializeBinaryFromReader(message: TpStateGetResponse, reader: jspb.BinaryReader): TpStateGetResponse;
}

export namespace TpStateGetResponse {
  export type AsObject = {
    entriesList: Array<TpStateEntry.AsObject>,
    status: TpStateGetResponse.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    AUTHORIZATION_ERROR = 2,
  }
}

export class TpStateSetRequest extends jspb.Message {
  getContextId(): string;
  setContextId(value: string): void;

  clearEntriesList(): void;
  getEntriesList(): Array<TpStateEntry>;
  setEntriesList(value: Array<TpStateEntry>): void;
  addEntries(value?: TpStateEntry, index?: number): TpStateEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TpStateSetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TpStateSetRequest): TpStateSetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TpStateSetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TpStateSetRequest;
  static deserializeBinaryFromReader(message: TpStateSetRequest, reader: jspb.BinaryReader): TpStateSetRequest;
}

export namespace TpStateSetRequest {
  export type AsObject = {
    contextId: string,
    entriesList: Array<TpStateEntry.AsObject>,
  }
}

export class TpStateSetResponse extends jspb.Message {
  clearAddressesList(): void;
  getAddressesList(): Array<string>;
  setAddressesList(value: Array<string>): void;
  addAddresses(value: string, index?: number): string;

  getStatus(): TpStateSetResponse.Status;
  setStatus(value: TpStateSetResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TpStateSetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TpStateSetResponse): TpStateSetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TpStateSetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TpStateSetResponse;
  static deserializeBinaryFromReader(message: TpStateSetResponse, reader: jspb.BinaryReader): TpStateSetResponse;
}

export namespace TpStateSetResponse {
  export type AsObject = {
    addressesList: Array<string>,
    status: TpStateSetResponse.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    AUTHORIZATION_ERROR = 2,
  }
}

export class TpStateDeleteRequest extends jspb.Message {
  getContextId(): string;
  setContextId(value: string): void;

  clearAddressesList(): void;
  getAddressesList(): Array<string>;
  setAddressesList(value: Array<string>): void;
  addAddresses(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TpStateDeleteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TpStateDeleteRequest): TpStateDeleteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TpStateDeleteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TpStateDeleteRequest;
  static deserializeBinaryFromReader(message: TpStateDeleteRequest, reader: jspb.BinaryReader): TpStateDeleteRequest;
}

export namespace TpStateDeleteRequest {
  export type AsObject = {
    contextId: string,
    addressesList: Array<string>,
  }
}

export class TpStateDeleteResponse extends jspb.Message {
  clearAddressesList(): void;
  getAddressesList(): Array<string>;
  setAddressesList(value: Array<string>): void;
  addAddresses(value: string, index?: number): string;

  getStatus(): TpStateDeleteResponse.Status;
  setStatus(value: TpStateDeleteResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TpStateDeleteResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TpStateDeleteResponse): TpStateDeleteResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TpStateDeleteResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TpStateDeleteResponse;
  static deserializeBinaryFromReader(message: TpStateDeleteResponse, reader: jspb.BinaryReader): TpStateDeleteResponse;
}

export namespace TpStateDeleteResponse {
  export type AsObject = {
    addressesList: Array<string>,
    status: TpStateDeleteResponse.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    AUTHORIZATION_ERROR = 2,
  }
}

export class TpReceiptAddDataRequest extends jspb.Message {
  getContextId(): string;
  setContextId(value: string): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TpReceiptAddDataRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TpReceiptAddDataRequest): TpReceiptAddDataRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TpReceiptAddDataRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TpReceiptAddDataRequest;
  static deserializeBinaryFromReader(message: TpReceiptAddDataRequest, reader: jspb.BinaryReader): TpReceiptAddDataRequest;
}

export namespace TpReceiptAddDataRequest {
  export type AsObject = {
    contextId: string,
    data: Uint8Array | string,
  }
}

export class TpReceiptAddDataResponse extends jspb.Message {
  getStatus(): TpReceiptAddDataResponse.Status;
  setStatus(value: TpReceiptAddDataResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TpReceiptAddDataResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TpReceiptAddDataResponse): TpReceiptAddDataResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TpReceiptAddDataResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TpReceiptAddDataResponse;
  static deserializeBinaryFromReader(message: TpReceiptAddDataResponse, reader: jspb.BinaryReader): TpReceiptAddDataResponse;
}

export namespace TpReceiptAddDataResponse {
  export type AsObject = {
    status: TpReceiptAddDataResponse.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    ERROR = 2,
  }
}

export class TpEventAddRequest extends jspb.Message {
  getContextId(): string;
  setContextId(value: string): void;

  hasEvent(): boolean;
  clearEvent(): void;
  getEvent(): events_pb.Event | undefined;
  setEvent(value?: events_pb.Event): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TpEventAddRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TpEventAddRequest): TpEventAddRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TpEventAddRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TpEventAddRequest;
  static deserializeBinaryFromReader(message: TpEventAddRequest, reader: jspb.BinaryReader): TpEventAddRequest;
}

export namespace TpEventAddRequest {
  export type AsObject = {
    contextId: string,
    event?: events_pb.Event.AsObject,
  }
}

export class TpEventAddResponse extends jspb.Message {
  getStatus(): TpEventAddResponse.Status;
  setStatus(value: TpEventAddResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TpEventAddResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TpEventAddResponse): TpEventAddResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TpEventAddResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TpEventAddResponse;
  static deserializeBinaryFromReader(message: TpEventAddResponse, reader: jspb.BinaryReader): TpEventAddResponse;
}

export namespace TpEventAddResponse {
  export type AsObject = {
    status: TpEventAddResponse.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    ERROR = 2,
  }
}

