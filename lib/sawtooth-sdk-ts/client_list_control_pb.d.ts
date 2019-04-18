// package: 
// file: client_list_control.proto

import * as jspb from "google-protobuf";

export class ClientPagingControls extends jspb.Message {
  getStart(): string;
  setStart(value: string): void;

  getLimit(): number;
  setLimit(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientPagingControls.AsObject;
  static toObject(includeInstance: boolean, msg: ClientPagingControls): ClientPagingControls.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientPagingControls, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientPagingControls;
  static deserializeBinaryFromReader(message: ClientPagingControls, reader: jspb.BinaryReader): ClientPagingControls;
}

export namespace ClientPagingControls {
  export type AsObject = {
    start: string,
    limit: number,
  }
}

export class ClientPagingResponse extends jspb.Message {
  getNext(): string;
  setNext(value: string): void;

  getStart(): string;
  setStart(value: string): void;

  getLimit(): number;
  setLimit(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientPagingResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientPagingResponse): ClientPagingResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientPagingResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientPagingResponse;
  static deserializeBinaryFromReader(message: ClientPagingResponse, reader: jspb.BinaryReader): ClientPagingResponse;
}

export namespace ClientPagingResponse {
  export type AsObject = {
    next: string,
    start: string,
    limit: number,
  }
}

export class ClientSortControls extends jspb.Message {
  clearKeysList(): void;
  getKeysList(): Array<string>;
  setKeysList(value: Array<string>): void;
  addKeys(value: string, index?: number): string;

  getReverse(): boolean;
  setReverse(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientSortControls.AsObject;
  static toObject(includeInstance: boolean, msg: ClientSortControls): ClientSortControls.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientSortControls, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientSortControls;
  static deserializeBinaryFromReader(message: ClientSortControls, reader: jspb.BinaryReader): ClientSortControls;
}

export namespace ClientSortControls {
  export type AsObject = {
    keysList: Array<string>,
    reverse: boolean,
  }
}

