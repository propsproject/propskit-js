// package: 
// file: genesis.proto

import * as jspb from "google-protobuf";
import * as batch_pb from "./batch_pb";

export class GenesisData extends jspb.Message {
  clearBatchesList(): void;
  getBatchesList(): Array<batch_pb.Batch>;
  setBatchesList(value: Array<batch_pb.Batch>): void;
  addBatches(value?: batch_pb.Batch, index?: number): batch_pb.Batch;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenesisData.AsObject;
  static toObject(includeInstance: boolean, msg: GenesisData): GenesisData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GenesisData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenesisData;
  static deserializeBinaryFromReader(message: GenesisData, reader: jspb.BinaryReader): GenesisData;
}

export namespace GenesisData {
  export type AsObject = {
    batchesList: Array<batch_pb.Batch.AsObject>,
  }
}

