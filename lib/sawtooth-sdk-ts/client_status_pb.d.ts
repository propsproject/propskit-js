// package: 
// file: client_status.proto

import * as jspb from "google-protobuf";

export class ClientStatusGetRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientStatusGetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientStatusGetRequest): ClientStatusGetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientStatusGetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientStatusGetRequest;
  static deserializeBinaryFromReader(message: ClientStatusGetRequest, reader: jspb.BinaryReader): ClientStatusGetRequest;
}

export namespace ClientStatusGetRequest {
  export type AsObject = {
  }
}

export class ClientStatusGetResponse extends jspb.Message {
  getStatus(): ClientStatusGetResponse.Status;
  setStatus(value: ClientStatusGetResponse.Status): void;

  clearPeersList(): void;
  getPeersList(): Array<ClientStatusGetResponse.Peer>;
  setPeersList(value: Array<ClientStatusGetResponse.Peer>): void;
  addPeers(value?: ClientStatusGetResponse.Peer, index?: number): ClientStatusGetResponse.Peer;

  getEndpoint(): string;
  setEndpoint(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientStatusGetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientStatusGetResponse): ClientStatusGetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientStatusGetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientStatusGetResponse;
  static deserializeBinaryFromReader(message: ClientStatusGetResponse, reader: jspb.BinaryReader): ClientStatusGetResponse;
}

export namespace ClientStatusGetResponse {
  export type AsObject = {
    status: ClientStatusGetResponse.Status,
    peersList: Array<ClientStatusGetResponse.Peer.AsObject>,
    endpoint: string,
  }

  export class Peer extends jspb.Message {
    getEndpoint(): string;
    setEndpoint(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Peer.AsObject;
    static toObject(includeInstance: boolean, msg: Peer): Peer.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Peer, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Peer;
    static deserializeBinaryFromReader(message: Peer, reader: jspb.BinaryReader): Peer;
  }

  export namespace Peer {
    export type AsObject = {
      endpoint: string,
    }
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    ERROR = 2,
  }
}

