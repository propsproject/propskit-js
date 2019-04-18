// package: 
// file: client_state.proto

import * as jspb from "google-protobuf";
import * as client_list_control_pb from "./client_list_control_pb";

export class ClientStateListRequest extends jspb.Message {
  getStateRoot(): string;
  setStateRoot(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): client_list_control_pb.ClientPagingControls | undefined;
  setPaging(value?: client_list_control_pb.ClientPagingControls): void;

  clearSortingList(): void;
  getSortingList(): Array<client_list_control_pb.ClientSortControls>;
  setSortingList(value: Array<client_list_control_pb.ClientSortControls>): void;
  addSorting(value?: client_list_control_pb.ClientSortControls, index?: number): client_list_control_pb.ClientSortControls;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientStateListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientStateListRequest): ClientStateListRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientStateListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientStateListRequest;
  static deserializeBinaryFromReader(message: ClientStateListRequest, reader: jspb.BinaryReader): ClientStateListRequest;
}

export namespace ClientStateListRequest {
  export type AsObject = {
    stateRoot: string,
    address: string,
    paging?: client_list_control_pb.ClientPagingControls.AsObject,
    sortingList: Array<client_list_control_pb.ClientSortControls.AsObject>,
  }
}

export class ClientStateListResponse extends jspb.Message {
  getStatus(): ClientStateListResponse.Status;
  setStatus(value: ClientStateListResponse.Status): void;

  clearEntriesList(): void;
  getEntriesList(): Array<ClientStateListResponse.Entry>;
  setEntriesList(value: Array<ClientStateListResponse.Entry>): void;
  addEntries(value?: ClientStateListResponse.Entry, index?: number): ClientStateListResponse.Entry;

  getStateRoot(): string;
  setStateRoot(value: string): void;

  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): client_list_control_pb.ClientPagingResponse | undefined;
  setPaging(value?: client_list_control_pb.ClientPagingResponse): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientStateListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientStateListResponse): ClientStateListResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientStateListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientStateListResponse;
  static deserializeBinaryFromReader(message: ClientStateListResponse, reader: jspb.BinaryReader): ClientStateListResponse;
}

export namespace ClientStateListResponse {
  export type AsObject = {
    status: ClientStateListResponse.Status,
    entriesList: Array<ClientStateListResponse.Entry.AsObject>,
    stateRoot: string,
    paging?: client_list_control_pb.ClientPagingResponse.AsObject,
  }

  export class Entry extends jspb.Message {
    getAddress(): string;
    setAddress(value: string): void;

    getData(): Uint8Array | string;
    getData_asU8(): Uint8Array;
    getData_asB64(): string;
    setData(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Entry.AsObject;
    static toObject(includeInstance: boolean, msg: Entry): Entry.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Entry, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Entry;
    static deserializeBinaryFromReader(message: Entry, reader: jspb.BinaryReader): Entry;
  }

  export namespace Entry {
    export type AsObject = {
      address: string,
      data: Uint8Array | string,
    }
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    INTERNAL_ERROR = 2,
    NOT_READY = 3,
    NO_ROOT = 4,
    NO_RESOURCE = 5,
    INVALID_PAGING = 6,
    INVALID_SORT = 7,
    INVALID_ADDRESS = 8,
    INVALID_ROOT = 9,
  }
}

export class ClientStateGetRequest extends jspb.Message {
  getStateRoot(): string;
  setStateRoot(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientStateGetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientStateGetRequest): ClientStateGetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientStateGetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientStateGetRequest;
  static deserializeBinaryFromReader(message: ClientStateGetRequest, reader: jspb.BinaryReader): ClientStateGetRequest;
}

export namespace ClientStateGetRequest {
  export type AsObject = {
    stateRoot: string,
    address: string,
  }
}

export class ClientStateGetResponse extends jspb.Message {
  getStatus(): ClientStateGetResponse.Status;
  setStatus(value: ClientStateGetResponse.Status): void;

  getValue(): Uint8Array | string;
  getValue_asU8(): Uint8Array;
  getValue_asB64(): string;
  setValue(value: Uint8Array | string): void;

  getStateRoot(): string;
  setStateRoot(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientStateGetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientStateGetResponse): ClientStateGetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientStateGetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientStateGetResponse;
  static deserializeBinaryFromReader(message: ClientStateGetResponse, reader: jspb.BinaryReader): ClientStateGetResponse;
}

export namespace ClientStateGetResponse {
  export type AsObject = {
    status: ClientStateGetResponse.Status,
    value: Uint8Array | string,
    stateRoot: string,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    INTERNAL_ERROR = 2,
    NOT_READY = 3,
    NO_ROOT = 4,
    NO_RESOURCE = 5,
    INVALID_ADDRESS = 6,
    INVALID_ROOT = 7,
  }
}

