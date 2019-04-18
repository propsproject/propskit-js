// package: 
// file: client_peers.proto

import * as jspb from "google-protobuf";

export class ClientPeersGetRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientPeersGetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientPeersGetRequest): ClientPeersGetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientPeersGetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientPeersGetRequest;
  static deserializeBinaryFromReader(message: ClientPeersGetRequest, reader: jspb.BinaryReader): ClientPeersGetRequest;
}

export namespace ClientPeersGetRequest {
  export type AsObject = {
  }
}

export class ClientPeersGetResponse extends jspb.Message {
  getStatus(): ClientPeersGetResponse.Status;
  setStatus(value: ClientPeersGetResponse.Status): void;

  clearPeersList(): void;
  getPeersList(): Array<string>;
  setPeersList(value: Array<string>): void;
  addPeers(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientPeersGetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientPeersGetResponse): ClientPeersGetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientPeersGetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientPeersGetResponse;
  static deserializeBinaryFromReader(message: ClientPeersGetResponse, reader: jspb.BinaryReader): ClientPeersGetResponse;
}

export namespace ClientPeersGetResponse {
  export type AsObject = {
    status: ClientPeersGetResponse.Status,
    peersList: Array<string>,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    ERROR = 2,
  }
}

