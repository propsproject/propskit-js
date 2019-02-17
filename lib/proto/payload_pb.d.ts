// package: pending_props_pb
// file: payload.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

export class Params extends jspb.Message {
  hasData(): boolean;
  clearData(): void;
  getData(): google_protobuf_any_pb.Any | undefined;
  setData(value?: google_protobuf_any_pb.Any): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Params.AsObject;
  static toObject(includeInstance: boolean, msg: Params): Params.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Params, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Params;
  static deserializeBinaryFromReader(message: Params, reader: jspb.BinaryReader): Params;
}

export namespace Params {
  export type AsObject = {
    data?: google_protobuf_any_pb.Any.AsObject,
  }
}

export class RPCRequest extends jspb.Message {
  getMethod(): Method;
  setMethod(value: Method): void;

  hasParams(): boolean;
  clearParams(): void;
  getParams(): Params | undefined;
  setParams(value?: Params): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RPCRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RPCRequest): RPCRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RPCRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RPCRequest;
  static deserializeBinaryFromReader(message: RPCRequest, reader: jspb.BinaryReader): RPCRequest;
}

export namespace RPCRequest {
  export type AsObject = {
    method: Method,
    params?: Params.AsObject,
  }
}

export enum Method {
  ISSUE = 0,
  REVOKE = 1,
  SETTLE = 2,
  BALANCE_UPDATE = 3,
  LAST_ETH_BLOCK_UPDATE = 4,
}

