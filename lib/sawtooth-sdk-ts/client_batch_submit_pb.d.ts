// package: 
// file: client_batch_submit.proto

import * as jspb from "google-protobuf";
import * as batch_pb from "./batch_pb";

export class ClientBatchStatus extends jspb.Message {
  getBatchId(): string;
  setBatchId(value: string): void;

  getStatus(): ClientBatchStatus.Status;
  setStatus(value: ClientBatchStatus.Status): void;

  clearInvalidTransactionsList(): void;
  getInvalidTransactionsList(): Array<ClientBatchStatus.InvalidTransaction>;
  setInvalidTransactionsList(value: Array<ClientBatchStatus.InvalidTransaction>): void;
  addInvalidTransactions(value?: ClientBatchStatus.InvalidTransaction, index?: number): ClientBatchStatus.InvalidTransaction;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientBatchStatus.AsObject;
  static toObject(includeInstance: boolean, msg: ClientBatchStatus): ClientBatchStatus.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientBatchStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientBatchStatus;
  static deserializeBinaryFromReader(message: ClientBatchStatus, reader: jspb.BinaryReader): ClientBatchStatus;
}

export namespace ClientBatchStatus {
  export type AsObject = {
    batchId: string,
    status: ClientBatchStatus.Status,
    invalidTransactionsList: Array<ClientBatchStatus.InvalidTransaction.AsObject>,
  }

  export class InvalidTransaction extends jspb.Message {
    getTransactionId(): string;
    setTransactionId(value: string): void;

    getMessage(): string;
    setMessage(value: string): void;

    getExtendedData(): Uint8Array | string;
    getExtendedData_asU8(): Uint8Array;
    getExtendedData_asB64(): string;
    setExtendedData(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InvalidTransaction.AsObject;
    static toObject(includeInstance: boolean, msg: InvalidTransaction): InvalidTransaction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InvalidTransaction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InvalidTransaction;
    static deserializeBinaryFromReader(message: InvalidTransaction, reader: jspb.BinaryReader): InvalidTransaction;
  }

  export namespace InvalidTransaction {
    export type AsObject = {
      transactionId: string,
      message: string,
      extendedData: Uint8Array | string,
    }
  }

  export enum Status {
    STATUS_UNSET = 0,
    COMMITTED = 1,
    INVALID = 2,
    PENDING = 3,
    UNKNOWN = 4,
  }
}

export class ClientBatchSubmitRequest extends jspb.Message {
  clearBatchesList(): void;
  getBatchesList(): Array<batch_pb.Batch>;
  setBatchesList(value: Array<batch_pb.Batch>): void;
  addBatches(value?: batch_pb.Batch, index?: number): batch_pb.Batch;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientBatchSubmitRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientBatchSubmitRequest): ClientBatchSubmitRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientBatchSubmitRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientBatchSubmitRequest;
  static deserializeBinaryFromReader(message: ClientBatchSubmitRequest, reader: jspb.BinaryReader): ClientBatchSubmitRequest;
}

export namespace ClientBatchSubmitRequest {
  export type AsObject = {
    batchesList: Array<batch_pb.Batch.AsObject>,
  }
}

export class ClientBatchSubmitResponse extends jspb.Message {
  getStatus(): ClientBatchSubmitResponse.Status;
  setStatus(value: ClientBatchSubmitResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientBatchSubmitResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientBatchSubmitResponse): ClientBatchSubmitResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientBatchSubmitResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientBatchSubmitResponse;
  static deserializeBinaryFromReader(message: ClientBatchSubmitResponse, reader: jspb.BinaryReader): ClientBatchSubmitResponse;
}

export namespace ClientBatchSubmitResponse {
  export type AsObject = {
    status: ClientBatchSubmitResponse.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    INTERNAL_ERROR = 2,
    INVALID_BATCH = 3,
    QUEUE_FULL = 4,
  }
}

export class ClientBatchStatusRequest extends jspb.Message {
  clearBatchIdsList(): void;
  getBatchIdsList(): Array<string>;
  setBatchIdsList(value: Array<string>): void;
  addBatchIds(value: string, index?: number): string;

  getWait(): boolean;
  setWait(value: boolean): void;

  getTimeout(): number;
  setTimeout(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientBatchStatusRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientBatchStatusRequest): ClientBatchStatusRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientBatchStatusRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientBatchStatusRequest;
  static deserializeBinaryFromReader(message: ClientBatchStatusRequest, reader: jspb.BinaryReader): ClientBatchStatusRequest;
}

export namespace ClientBatchStatusRequest {
  export type AsObject = {
    batchIdsList: Array<string>,
    wait: boolean,
    timeout: number,
  }
}

export class ClientBatchStatusResponse extends jspb.Message {
  getStatus(): ClientBatchStatusResponse.Status;
  setStatus(value: ClientBatchStatusResponse.Status): void;

  clearBatchStatusesList(): void;
  getBatchStatusesList(): Array<ClientBatchStatus>;
  setBatchStatusesList(value: Array<ClientBatchStatus>): void;
  addBatchStatuses(value?: ClientBatchStatus, index?: number): ClientBatchStatus;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientBatchStatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientBatchStatusResponse): ClientBatchStatusResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientBatchStatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientBatchStatusResponse;
  static deserializeBinaryFromReader(message: ClientBatchStatusResponse, reader: jspb.BinaryReader): ClientBatchStatusResponse;
}

export namespace ClientBatchStatusResponse {
  export type AsObject = {
    status: ClientBatchStatusResponse.Status,
    batchStatusesList: Array<ClientBatchStatus.AsObject>,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    INTERNAL_ERROR = 2,
    NO_RESOURCE = 5,
    INVALID_ID = 8,
  }
}

