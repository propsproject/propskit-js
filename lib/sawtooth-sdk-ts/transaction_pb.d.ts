// package: 
// file: transaction.proto

import * as jspb from "google-protobuf";

export class TransactionHeader extends jspb.Message {
  getBatcherPublicKey(): string;
  setBatcherPublicKey(value: string): void;

  clearDependenciesList(): void;
  getDependenciesList(): Array<string>;
  setDependenciesList(value: Array<string>): void;
  addDependencies(value: string, index?: number): string;

  getFamilyName(): string;
  setFamilyName(value: string): void;

  getFamilyVersion(): string;
  setFamilyVersion(value: string): void;

  clearInputsList(): void;
  getInputsList(): Array<string>;
  setInputsList(value: Array<string>): void;
  addInputs(value: string, index?: number): string;

  getNonce(): string;
  setNonce(value: string): void;

  clearOutputsList(): void;
  getOutputsList(): Array<string>;
  setOutputsList(value: Array<string>): void;
  addOutputs(value: string, index?: number): string;

  getPayloadSha512(): string;
  setPayloadSha512(value: string): void;

  getSignerPublicKey(): string;
  setSignerPublicKey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionHeader.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionHeader): TransactionHeader.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransactionHeader, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionHeader;
  static deserializeBinaryFromReader(message: TransactionHeader, reader: jspb.BinaryReader): TransactionHeader;
}

export namespace TransactionHeader {
  export type AsObject = {
    batcherPublicKey: string,
    dependenciesList: Array<string>,
    familyName: string,
    familyVersion: string,
    inputsList: Array<string>,
    nonce: string,
    outputsList: Array<string>,
    payloadSha512: string,
    signerPublicKey: string,
  }
}

export class Transaction extends jspb.Message {
  getHeader(): Uint8Array | string;
  getHeader_asU8(): Uint8Array;
  getHeader_asB64(): string;
  setHeader(value: Uint8Array | string): void;

  getHeaderSignature(): string;
  setHeaderSignature(value: string): void;

  getPayload(): Uint8Array | string;
  getPayload_asU8(): Uint8Array;
  getPayload_asB64(): string;
  setPayload(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Transaction.AsObject;
  static toObject(includeInstance: boolean, msg: Transaction): Transaction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Transaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Transaction;
  static deserializeBinaryFromReader(message: Transaction, reader: jspb.BinaryReader): Transaction;
}

export namespace Transaction {
  export type AsObject = {
    header: Uint8Array | string,
    headerSignature: string,
    payload: Uint8Array | string,
  }
}

export class TransactionList extends jspb.Message {
  clearTransactionsList(): void;
  getTransactionsList(): Array<Transaction>;
  setTransactionsList(value: Array<Transaction>): void;
  addTransactions(value?: Transaction, index?: number): Transaction;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionList.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionList): TransactionList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransactionList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionList;
  static deserializeBinaryFromReader(message: TransactionList, reader: jspb.BinaryReader): TransactionList;
}

export namespace TransactionList {
  export type AsObject = {
    transactionsList: Array<Transaction.AsObject>,
  }
}

