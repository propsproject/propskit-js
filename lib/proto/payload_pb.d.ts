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

export class BalanceUpdate extends jspb.Message {
  getPublicAddress(): string;
  setPublicAddress(value: string): void;

  getOnchainBalance(): string;
  setOnchainBalance(value: string): void;

  getTxHash(): string;
  setTxHash(value: string): void;

  getBlockId(): number;
  setBlockId(value: number): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BalanceUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: BalanceUpdate): BalanceUpdate.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BalanceUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BalanceUpdate;
  static deserializeBinaryFromReader(message: BalanceUpdate, reader: jspb.BinaryReader): BalanceUpdate;
}

export namespace BalanceUpdate {
  export type AsObject = {
    publicAddress: string,
    onchainBalance: string,
    txHash: string,
    blockId: number,
    timestamp: number,
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

export enum Method {
  ISSUE = 0,
  REVOKE = 1,
  SETTLE = 2,
  BALANCE_UPDATE = 3,
  LAST_ETH_BLOCK_UPDATE = 4,
  WALLET_LINK = 5,
  ACTIVITY_LOG = 6,
}

