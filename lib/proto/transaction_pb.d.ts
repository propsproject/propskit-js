// package: pending_props_pb
// file: transaction.proto

import * as jspb from "google-protobuf";
import * as payload_pb from "./payload_pb";

export class Transaction extends jspb.Message {
  getType(): payload_pb.Method;
  setType(value: payload_pb.Method): void;

  getUserId(): string;
  setUserId(value: string): void;

  getApplicationId(): string;
  setApplicationId(value: string): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  getAmount(): string;
  setAmount(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getTxHash(): string;
  setTxHash(value: string): void;

  getWallet(): string;
  setWallet(value: string): void;

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
    type: payload_pb.Method,
    userId: string,
    applicationId: string,
    timestamp: number,
    amount: string,
    description: string,
    txHash: string,
    wallet: string,
  }
}

