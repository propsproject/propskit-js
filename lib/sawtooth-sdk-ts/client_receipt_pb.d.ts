// package: 
// file: client_receipt.proto

import * as jspb from "google-protobuf";
import * as transaction_receipt_pb from "./transaction_receipt_pb";

export class ClientReceiptGetRequest extends jspb.Message {
  clearTransactionIdsList(): void;
  getTransactionIdsList(): Array<string>;
  setTransactionIdsList(value: Array<string>): void;
  addTransactionIds(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientReceiptGetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientReceiptGetRequest): ClientReceiptGetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientReceiptGetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientReceiptGetRequest;
  static deserializeBinaryFromReader(message: ClientReceiptGetRequest, reader: jspb.BinaryReader): ClientReceiptGetRequest;
}

export namespace ClientReceiptGetRequest {
  export type AsObject = {
    transactionIdsList: Array<string>,
  }
}

export class ClientReceiptGetResponse extends jspb.Message {
  getStatus(): ClientReceiptGetResponse.Status;
  setStatus(value: ClientReceiptGetResponse.Status): void;

  clearReceiptsList(): void;
  getReceiptsList(): Array<transaction_receipt_pb.TransactionReceipt>;
  setReceiptsList(value: Array<transaction_receipt_pb.TransactionReceipt>): void;
  addReceipts(value?: transaction_receipt_pb.TransactionReceipt, index?: number): transaction_receipt_pb.TransactionReceipt;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientReceiptGetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientReceiptGetResponse): ClientReceiptGetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientReceiptGetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientReceiptGetResponse;
  static deserializeBinaryFromReader(message: ClientReceiptGetResponse, reader: jspb.BinaryReader): ClientReceiptGetResponse;
}

export namespace ClientReceiptGetResponse {
  export type AsObject = {
    status: ClientReceiptGetResponse.Status,
    receiptsList: Array<transaction_receipt_pb.TransactionReceipt.AsObject>,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    INTERNAL_ERROR = 2,
    NO_RESOURCE = 5,
    INVALID_ID = 8,
  }
}

