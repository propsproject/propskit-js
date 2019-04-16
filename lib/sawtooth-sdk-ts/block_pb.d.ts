// package: 
// file: block.proto

import * as jspb from "google-protobuf";
import * as batch_pb from "./batch_pb";

export class BlockHeader extends jspb.Message {
  getBlockNum(): number;
  setBlockNum(value: number): void;

  getPreviousBlockId(): string;
  setPreviousBlockId(value: string): void;

  getSignerPublicKey(): string;
  setSignerPublicKey(value: string): void;

  clearBatchIdsList(): void;
  getBatchIdsList(): Array<string>;
  setBatchIdsList(value: Array<string>): void;
  addBatchIds(value: string, index?: number): string;

  getConsensus(): Uint8Array | string;
  getConsensus_asU8(): Uint8Array;
  getConsensus_asB64(): string;
  setConsensus(value: Uint8Array | string): void;

  getStateRootHash(): string;
  setStateRootHash(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockHeader.AsObject;
  static toObject(includeInstance: boolean, msg: BlockHeader): BlockHeader.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlockHeader, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockHeader;
  static deserializeBinaryFromReader(message: BlockHeader, reader: jspb.BinaryReader): BlockHeader;
}

export namespace BlockHeader {
  export type AsObject = {
    blockNum: number,
    previousBlockId: string,
    signerPublicKey: string,
    batchIdsList: Array<string>,
    consensus: Uint8Array | string,
    stateRootHash: string,
  }
}

export class Block extends jspb.Message {
  getHeader(): Uint8Array | string;
  getHeader_asU8(): Uint8Array;
  getHeader_asB64(): string;
  setHeader(value: Uint8Array | string): void;

  getHeaderSignature(): string;
  setHeaderSignature(value: string): void;

  clearBatchesList(): void;
  getBatchesList(): Array<batch_pb.Batch>;
  setBatchesList(value: Array<batch_pb.Batch>): void;
  addBatches(value?: batch_pb.Batch, index?: number): batch_pb.Batch;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Block.AsObject;
  static toObject(includeInstance: boolean, msg: Block): Block.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Block, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Block;
  static deserializeBinaryFromReader(message: Block, reader: jspb.BinaryReader): Block;
}

export namespace Block {
  export type AsObject = {
    header: Uint8Array | string,
    headerSignature: string,
    batchesList: Array<batch_pb.Batch.AsObject>,
  }
}

