// package: pending_props_pb
// file: activity.proto

import * as jspb from "google-protobuf";
import * as balance_pb from "./balance_pb";

export class ActivityLog extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getApplicationId(): string;
  setApplicationId(value: string): void;

  getDate(): number;
  setDate(value: number): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  hasBalance(): boolean;
  clearBalance(): void;
  getBalance(): balance_pb.Balance | undefined;
  setBalance(value?: balance_pb.Balance): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActivityLog.AsObject;
  static toObject(includeInstance: boolean, msg: ActivityLog): ActivityLog.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ActivityLog, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActivityLog;
  static deserializeBinaryFromReader(message: ActivityLog, reader: jspb.BinaryReader): ActivityLog;
}

export namespace ActivityLog {
  export type AsObject = {
    userId: string,
    applicationId: string,
    date: number,
    timestamp: number,
    balance?: balance_pb.Balance.AsObject,
  }
}

