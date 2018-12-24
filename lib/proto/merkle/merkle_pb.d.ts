// package: 
// file: merkle.proto

import * as jspb from "google-protobuf";

export class ChangeLogEntry extends jspb.Message {
  getParent(): Uint8Array | string;
  getParent_asU8(): Uint8Array;
  getParent_asB64(): string;
  setParent(value: Uint8Array | string): void;

  clearAdditionsList(): void;
  getAdditionsList(): Array<Uint8Array | string>;
  getAdditionsList_asU8(): Array<Uint8Array>;
  getAdditionsList_asB64(): Array<string>;
  setAdditionsList(value: Array<Uint8Array | string>): void;
  addAdditions(value: Uint8Array | string, index?: number): Uint8Array | string;

  clearSuccessorsList(): void;
  getSuccessorsList(): Array<ChangeLogEntry.Successor>;
  setSuccessorsList(value: Array<ChangeLogEntry.Successor>): void;
  addSuccessors(value?: ChangeLogEntry.Successor, index?: number): ChangeLogEntry.Successor;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangeLogEntry.AsObject;
  static toObject(includeInstance: boolean, msg: ChangeLogEntry): ChangeLogEntry.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChangeLogEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangeLogEntry;
  static deserializeBinaryFromReader(message: ChangeLogEntry, reader: jspb.BinaryReader): ChangeLogEntry;
}

export namespace ChangeLogEntry {
  export type AsObject = {
    parent: Uint8Array | string,
    additionsList: Array<Uint8Array | string>,
    successorsList: Array<ChangeLogEntry.Successor.AsObject>,
  }

  export class Successor extends jspb.Message {
    getSuccessor(): Uint8Array | string;
    getSuccessor_asU8(): Uint8Array;
    getSuccessor_asB64(): string;
    setSuccessor(value: Uint8Array | string): void;

    clearDeletionsList(): void;
    getDeletionsList(): Array<Uint8Array | string>;
    getDeletionsList_asU8(): Array<Uint8Array>;
    getDeletionsList_asB64(): Array<string>;
    setDeletionsList(value: Array<Uint8Array | string>): void;
    addDeletions(value: Uint8Array | string, index?: number): Uint8Array | string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Successor.AsObject;
    static toObject(includeInstance: boolean, msg: Successor): Successor.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Successor, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Successor;
    static deserializeBinaryFromReader(message: Successor, reader: jspb.BinaryReader): Successor;
  }

  export namespace Successor {
    export type AsObject = {
      successor: Uint8Array | string,
      deletionsList: Array<Uint8Array | string>,
    }
  }
}

