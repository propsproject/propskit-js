// package: 
// file: client_batch.proto

import * as jspb from "google-protobuf";
import * as batch_pb from "./batch_pb";
import * as client_list_control_pb from "./client_list_control_pb";

export class ClientBatchListRequest extends jspb.Message {
  getHeadId(): string;
  setHeadId(value: string): void;

  clearBatchIdsList(): void;
  getBatchIdsList(): Array<string>;
  setBatchIdsList(value: Array<string>): void;
  addBatchIds(value: string, index?: number): string;

  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): client_list_control_pb.ClientPagingControls | undefined;
  setPaging(value?: client_list_control_pb.ClientPagingControls): void;

  clearSortingList(): void;
  getSortingList(): Array<client_list_control_pb.ClientSortControls>;
  setSortingList(value: Array<client_list_control_pb.ClientSortControls>): void;
  addSorting(value?: client_list_control_pb.ClientSortControls, index?: number): client_list_control_pb.ClientSortControls;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientBatchListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientBatchListRequest): ClientBatchListRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientBatchListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientBatchListRequest;
  static deserializeBinaryFromReader(message: ClientBatchListRequest, reader: jspb.BinaryReader): ClientBatchListRequest;
}

export namespace ClientBatchListRequest {
  export type AsObject = {
    headId: string,
    batchIdsList: Array<string>,
    paging?: client_list_control_pb.ClientPagingControls.AsObject,
    sortingList: Array<client_list_control_pb.ClientSortControls.AsObject>,
  }
}

export class ClientBatchListResponse extends jspb.Message {
  getStatus(): ClientBatchListResponse.Status;
  setStatus(value: ClientBatchListResponse.Status): void;

  clearBatchesList(): void;
  getBatchesList(): Array<batch_pb.Batch>;
  setBatchesList(value: Array<batch_pb.Batch>): void;
  addBatches(value?: batch_pb.Batch, index?: number): batch_pb.Batch;

  getHeadId(): string;
  setHeadId(value: string): void;

  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): client_list_control_pb.ClientPagingResponse | undefined;
  setPaging(value?: client_list_control_pb.ClientPagingResponse): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientBatchListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientBatchListResponse): ClientBatchListResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientBatchListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientBatchListResponse;
  static deserializeBinaryFromReader(message: ClientBatchListResponse, reader: jspb.BinaryReader): ClientBatchListResponse;
}

export namespace ClientBatchListResponse {
  export type AsObject = {
    status: ClientBatchListResponse.Status,
    batchesList: Array<batch_pb.Batch.AsObject>,
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

export class ClientBatchGetRequest extends jspb.Message {
  getBatchId(): string;
  setBatchId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientBatchGetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientBatchGetRequest): ClientBatchGetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientBatchGetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientBatchGetRequest;
  static deserializeBinaryFromReader(message: ClientBatchGetRequest, reader: jspb.BinaryReader): ClientBatchGetRequest;
}

export namespace ClientBatchGetRequest {
  export type AsObject = {
    batchId: string,
  }
}

export class ClientBatchGetResponse extends jspb.Message {
  getStatus(): ClientBatchGetResponse.Status;
  setStatus(value: ClientBatchGetResponse.Status): void;

  hasBatch(): boolean;
  clearBatch(): void;
  getBatch(): batch_pb.Batch | undefined;
  setBatch(value?: batch_pb.Batch): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientBatchGetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientBatchGetResponse): ClientBatchGetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientBatchGetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientBatchGetResponse;
  static deserializeBinaryFromReader(message: ClientBatchGetResponse, reader: jspb.BinaryReader): ClientBatchGetResponse;
}

export namespace ClientBatchGetResponse {
  export type AsObject = {
    status: ClientBatchGetResponse.Status,
    batch?: batch_pb.Batch.AsObject,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    INTERNAL_ERROR = 2,
    NO_RESOURCE = 5,
    INVALID_ID = 8,
  }
}

