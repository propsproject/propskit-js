// package: 
// file: processor.proto

import * as jspb from "google-protobuf";
import * as transaction_pb from "./transaction_pb";

export class TpRegisterRequest extends jspb.Message {
  getFamily(): string;
  setFamily(value: string): void;

  getVersion(): string;
  setVersion(value: string): void;

  clearNamespacesList(): void;
  getNamespacesList(): Array<string>;
  setNamespacesList(value: Array<string>): void;
  addNamespaces(value: string, index?: number): string;

  getMaxOccupancy(): number;
  setMaxOccupancy(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TpRegisterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TpRegisterRequest): TpRegisterRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TpRegisterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TpRegisterRequest;
  static deserializeBinaryFromReader(message: TpRegisterRequest, reader: jspb.BinaryReader): TpRegisterRequest;
}

export namespace TpRegisterRequest {
  export type AsObject = {
    family: string,
    version: string,
    namespacesList: Array<string>,
    maxOccupancy: number,
  }
}

export class TpRegisterResponse extends jspb.Message {
  getStatus(): TpRegisterResponse.Status;
  setStatus(value: TpRegisterResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TpRegisterResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TpRegisterResponse): TpRegisterResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TpRegisterResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TpRegisterResponse;
  static deserializeBinaryFromReader(message: TpRegisterResponse, reader: jspb.BinaryReader): TpRegisterResponse;
}

export namespace TpRegisterResponse {
  export type AsObject = {
    status: TpRegisterResponse.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    ERROR = 2,
  }
}

export class TpUnregisterRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TpUnregisterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TpUnregisterRequest): TpUnregisterRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TpUnregisterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TpUnregisterRequest;
  static deserializeBinaryFromReader(message: TpUnregisterRequest, reader: jspb.BinaryReader): TpUnregisterRequest;
}

export namespace TpUnregisterRequest {
  export type AsObject = {
  }
}

export class TpUnregisterResponse extends jspb.Message {
  getStatus(): TpUnregisterResponse.Status;
  setStatus(value: TpUnregisterResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TpUnregisterResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TpUnregisterResponse): TpUnregisterResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TpUnregisterResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TpUnregisterResponse;
  static deserializeBinaryFromReader(message: TpUnregisterResponse, reader: jspb.BinaryReader): TpUnregisterResponse;
}

export namespace TpUnregisterResponse {
  export type AsObject = {
    status: TpUnregisterResponse.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    ERROR = 2,
  }
}

export class TpProcessRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): transaction_pb.TransactionHeader | undefined;
  setHeader(value?: transaction_pb.TransactionHeader): void;

  getPayload(): Uint8Array | string;
  getPayload_asU8(): Uint8Array;
  getPayload_asB64(): string;
  setPayload(value: Uint8Array | string): void;

  getSignature(): string;
  setSignature(value: string): void;

  getContextId(): string;
  setContextId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TpProcessRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TpProcessRequest): TpProcessRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TpProcessRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TpProcessRequest;
  static deserializeBinaryFromReader(message: TpProcessRequest, reader: jspb.BinaryReader): TpProcessRequest;
}

export namespace TpProcessRequest {
  export type AsObject = {
    header?: transaction_pb.TransactionHeader.AsObject,
    payload: Uint8Array | string,
    signature: string,
    contextId: string,
  }
}

export class TpProcessResponse extends jspb.Message {
  getStatus(): TpProcessResponse.Status;
  setStatus(value: TpProcessResponse.Status): void;

  getMessage(): string;
  setMessage(value: string): void;

  getExtendedData(): Uint8Array | string;
  getExtendedData_asU8(): Uint8Array;
  getExtendedData_asB64(): string;
  setExtendedData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TpProcessResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TpProcessResponse): TpProcessResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TpProcessResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TpProcessResponse;
  static deserializeBinaryFromReader(message: TpProcessResponse, reader: jspb.BinaryReader): TpProcessResponse;
}

export namespace TpProcessResponse {
  export type AsObject = {
    status: TpProcessResponse.Status,
    message: string,
    extendedData: Uint8Array | string,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    INVALID_TRANSACTION = 2,
    INTERNAL_ERROR = 3,
  }
}

