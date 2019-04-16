// package: 
// file: client_transaction.proto

import * as jspb from "google-protobuf";
import * as transaction_pb from "./transaction_pb";
import * as client_list_control_pb from "./client_list_control_pb";

export class ClientTransactionListRequest extends jspb.Message {
  getHeadId(): string;
  setHeadId(value: string): void;

  clearTransactionIdsList(): void;
  getTransactionIdsList(): Array<string>;
  setTransactionIdsList(value: Array<string>): void;
  addTransactionIds(value: string, index?: number): string;

  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): client_list_control_pb.ClientPagingControls | undefined;
  setPaging(value?: client_list_control_pb.ClientPagingControls): void;

  clearSortingList(): void;
  getSortingList(): Array<client_list_control_pb.ClientSortControls>;
  setSortingList(value: Array<client_list_control_pb.ClientSortControls>): void;
  addSorting(value?: client_list_control_pb.ClientSortControls, index?: number): client_list_control_pb.ClientSortControls;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientTransactionListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientTransactionListRequest): ClientTransactionListRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientTransactionListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientTransactionListRequest;
  static deserializeBinaryFromReader(message: ClientTransactionListRequest, reader: jspb.BinaryReader): ClientTransactionListRequest;
}

export namespace ClientTransactionListRequest {
  export type AsObject = {
    headId: string,
    transactionIdsList: Array<string>,
    paging?: client_list_control_pb.ClientPagingControls.AsObject,
    sortingList: Array<client_list_control_pb.ClientSortControls.AsObject>,
  }
}

export class ClientTransactionListResponse extends jspb.Message {
  getStatus(): ClientTransactionListResponse.Status;
  setStatus(value: ClientTransactionListResponse.Status): void;

  clearTransactionsList(): void;
  getTransactionsList(): Array<transaction_pb.Transaction>;
  setTransactionsList(value: Array<transaction_pb.Transaction>): void;
  addTransactions(value?: transaction_pb.Transaction, index?: number): transaction_pb.Transaction;

  getHeadId(): string;
  setHeadId(value: string): void;

  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): client_list_control_pb.ClientPagingResponse | undefined;
  setPaging(value?: client_list_control_pb.ClientPagingResponse): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientTransactionListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientTransactionListResponse): ClientTransactionListResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientTransactionListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientTransactionListResponse;
  static deserializeBinaryFromReader(message: ClientTransactionListResponse, reader: jspb.BinaryReader): ClientTransactionListResponse;
}

export namespace ClientTransactionListResponse {
  export type AsObject = {
    status: ClientTransactionListResponse.Status,
    transactionsList: Array<transaction_pb.Transaction.AsObject>,
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

export class ClientTransactionGetRequest extends jspb.Message {
  getTransactionId(): string;
  setTransactionId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientTransactionGetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientTransactionGetRequest): ClientTransactionGetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientTransactionGetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientTransactionGetRequest;
  static deserializeBinaryFromReader(message: ClientTransactionGetRequest, reader: jspb.BinaryReader): ClientTransactionGetRequest;
}

export namespace ClientTransactionGetRequest {
  export type AsObject = {
    transactionId: string,
  }
}

export class ClientTransactionGetResponse extends jspb.Message {
  getStatus(): ClientTransactionGetResponse.Status;
  setStatus(value: ClientTransactionGetResponse.Status): void;

  hasTransaction(): boolean;
  clearTransaction(): void;
  getTransaction(): transaction_pb.Transaction | undefined;
  setTransaction(value?: transaction_pb.Transaction): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientTransactionGetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientTransactionGetResponse): ClientTransactionGetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientTransactionGetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientTransactionGetResponse;
  static deserializeBinaryFromReader(message: ClientTransactionGetResponse, reader: jspb.BinaryReader): ClientTransactionGetResponse;
}

export namespace ClientTransactionGetResponse {
  export type AsObject = {
    status: ClientTransactionGetResponse.Status,
    transaction?: transaction_pb.Transaction.AsObject,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    INTERNAL_ERROR = 2,
    NO_RESOURCE = 5,
    INVALID_ID = 8,
  }
}

