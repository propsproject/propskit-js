// package: 
// file: batch.proto

import * as jspb from "google-protobuf";
import * as transaction_pb from "./transaction_pb";

export class BatchHeader extends jspb.Message {
  getSignerPublicKey(): string;
  setSignerPublicKey(value: string): void;

  clearTransactionIdsList(): void;
  getTransactionIdsList(): Array<string>;
  setTransactionIdsList(value: Array<string>): void;
  addTransactionIds(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BatchHeader.AsObject;
  static toObject(includeInstance: boolean, msg: BatchHeader): BatchHeader.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BatchHeader, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BatchHeader;
  static deserializeBinaryFromReader(message: BatchHeader, reader: jspb.BinaryReader): BatchHeader;
}

export namespace BatchHeader {
  export type AsObject = {
    signerPublicKey: string,
    transactionIdsList: Array<string>,
  }
}

export class Batch extends jspb.Message {
  getHeader(): Uint8Array | string;
  getHeader_asU8(): Uint8Array;
  getHeader_asB64(): string;
  setHeader(value: Uint8Array | string): void;

  getHeaderSignature(): string;
  setHeaderSignature(value: string): void;

  clearTransactionsList(): void;
  getTransactionsList(): Array<transaction_pb.Transaction>;
  setTransactionsList(value: Array<transaction_pb.Transaction>): void;
  addTransactions(value?: transaction_pb.Transaction, index?: number): transaction_pb.Transaction;

  getTrace(): boolean;
  setTrace(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Batch.AsObject;
  static toObject(includeInstance: boolean, msg: Batch): Batch.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Batch, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Batch;
  static deserializeBinaryFromReader(message: Batch, reader: jspb.BinaryReader): Batch;
}

export namespace Batch {
  export type AsObject = {
    header: Uint8Array | string,
    headerSignature: string,
    transactionsList: Array<transaction_pb.Transaction.AsObject>,
    trace: boolean,
  }
}

export class BatchList extends jspb.Message {
  clearBatchesList(): void;
  getBatchesList(): Array<Batch>;
  setBatchesList(value: Array<Batch>): void;
  addBatches(value?: Batch, index?: number): Batch;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BatchList.AsObject;
  static toObject(includeInstance: boolean, msg: BatchList): BatchList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BatchList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BatchList;
  static deserializeBinaryFromReader(message: BatchList, reader: jspb.BinaryReader): BatchList;
}

export namespace BatchList {
  export type AsObject = {
    batchesList: Array<Batch.AsObject>,
  }
}

