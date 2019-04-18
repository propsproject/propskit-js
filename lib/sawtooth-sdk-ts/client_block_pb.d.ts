// package: 
// file: client_block.proto

import * as jspb from "google-protobuf";
import * as block_pb from "./block_pb";
import * as client_list_control_pb from "./client_list_control_pb";

export class ClientBlockListRequest extends jspb.Message {
  getHeadId(): string;
  setHeadId(value: string): void;

  clearBlockIdsList(): void;
  getBlockIdsList(): Array<string>;
  setBlockIdsList(value: Array<string>): void;
  addBlockIds(value: string, index?: number): string;

  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): client_list_control_pb.ClientPagingControls | undefined;
  setPaging(value?: client_list_control_pb.ClientPagingControls): void;

  clearSortingList(): void;
  getSortingList(): Array<client_list_control_pb.ClientSortControls>;
  setSortingList(value: Array<client_list_control_pb.ClientSortControls>): void;
  addSorting(value?: client_list_control_pb.ClientSortControls, index?: number): client_list_control_pb.ClientSortControls;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientBlockListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientBlockListRequest): ClientBlockListRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientBlockListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientBlockListRequest;
  static deserializeBinaryFromReader(message: ClientBlockListRequest, reader: jspb.BinaryReader): ClientBlockListRequest;
}

export namespace ClientBlockListRequest {
  export type AsObject = {
    headId: string,
    blockIdsList: Array<string>,
    paging?: client_list_control_pb.ClientPagingControls.AsObject,
    sortingList: Array<client_list_control_pb.ClientSortControls.AsObject>,
  }
}

export class ClientBlockListResponse extends jspb.Message {
  getStatus(): ClientBlockListResponse.Status;
  setStatus(value: ClientBlockListResponse.Status): void;

  clearBlocksList(): void;
  getBlocksList(): Array<block_pb.Block>;
  setBlocksList(value: Array<block_pb.Block>): void;
  addBlocks(value?: block_pb.Block, index?: number): block_pb.Block;

  getHeadId(): string;
  setHeadId(value: string): void;

  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): client_list_control_pb.ClientPagingResponse | undefined;
  setPaging(value?: client_list_control_pb.ClientPagingResponse): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientBlockListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientBlockListResponse): ClientBlockListResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientBlockListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientBlockListResponse;
  static deserializeBinaryFromReader(message: ClientBlockListResponse, reader: jspb.BinaryReader): ClientBlockListResponse;
}

export namespace ClientBlockListResponse {
  export type AsObject = {
    status: ClientBlockListResponse.Status,
    blocksList: Array<block_pb.Block.AsObject>,
    headId: string,
    paging?: client_list_control_pb.ClientPagingResponse.AsObject,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    INTERNAL_ERROR = 2,
    NOT_READY = 3,
    NO_ROOT = 4,
    NO_RESOURCE = 5,
    INVALID_PAGING = 6,
    INVALID_SORT = 7,
    INVALID_ID = 8,
  }
}

export class ClientBlockGetByIdRequest extends jspb.Message {
  getBlockId(): string;
  setBlockId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientBlockGetByIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientBlockGetByIdRequest): ClientBlockGetByIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientBlockGetByIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientBlockGetByIdRequest;
  static deserializeBinaryFromReader(message: ClientBlockGetByIdRequest, reader: jspb.BinaryReader): ClientBlockGetByIdRequest;
}

export namespace ClientBlockGetByIdRequest {
  export type AsObject = {
    blockId: string,
  }
}

export class ClientBlockGetByNumRequest extends jspb.Message {
  getBlockNum(): number;
  setBlockNum(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientBlockGetByNumRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientBlockGetByNumRequest): ClientBlockGetByNumRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientBlockGetByNumRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientBlockGetByNumRequest;
  static deserializeBinaryFromReader(message: ClientBlockGetByNumRequest, reader: jspb.BinaryReader): ClientBlockGetByNumRequest;
}

export namespace ClientBlockGetByNumRequest {
  export type AsObject = {
    blockNum: number,
  }
}

export class ClientBlockGetByTransactionIdRequest extends jspb.Message {
  getTransactionId(): string;
  setTransactionId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientBlockGetByTransactionIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientBlockGetByTransactionIdRequest): ClientBlockGetByTransactionIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientBlockGetByTransactionIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientBlockGetByTransactionIdRequest;
  static deserializeBinaryFromReader(message: ClientBlockGetByTransactionIdRequest, reader: jspb.BinaryReader): ClientBlockGetByTransactionIdRequest;
}

export namespace ClientBlockGetByTransactionIdRequest {
  export type AsObject = {
    transactionId: string,
  }
}

export class ClientBlockGetByBatchIdRequest extends jspb.Message {
  getBatchId(): string;
  setBatchId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientBlockGetByBatchIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientBlockGetByBatchIdRequest): ClientBlockGetByBatchIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientBlockGetByBatchIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientBlockGetByBatchIdRequest;
  static deserializeBinaryFromReader(message: ClientBlockGetByBatchIdRequest, reader: jspb.BinaryReader): ClientBlockGetByBatchIdRequest;
}

export namespace ClientBlockGetByBatchIdRequest {
  export type AsObject = {
    batchId: string,
  }
}

export class ClientBlockGetResponse extends jspb.Message {
  getStatus(): ClientBlockGetResponse.Status;
  setStatus(value: ClientBlockGetResponse.Status): void;

  hasBlock(): boolean;
  clearBlock(): void;
  getBlock(): block_pb.Block | undefined;
  setBlock(value?: block_pb.Block): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientBlockGetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientBlockGetResponse): ClientBlockGetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientBlockGetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientBlockGetResponse;
  static deserializeBinaryFromReader(message: ClientBlockGetResponse, reader: jspb.BinaryReader): ClientBlockGetResponse;
}

export namespace ClientBlockGetResponse {
  export type AsObject = {
    status: ClientBlockGetResponse.Status,
    block?: block_pb.Block.AsObject,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    INTERNAL_ERROR = 2,
    NO_RESOURCE = 5,
    INVALID_ID = 8,
  }
}

