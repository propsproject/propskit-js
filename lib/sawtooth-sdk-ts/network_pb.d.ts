// package: 
// file: network.proto

import * as jspb from "google-protobuf";

export class DisconnectMessage extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisconnectMessage.AsObject;
  static toObject(includeInstance: boolean, msg: DisconnectMessage): DisconnectMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DisconnectMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisconnectMessage;
  static deserializeBinaryFromReader(message: DisconnectMessage, reader: jspb.BinaryReader): DisconnectMessage;
}

export namespace DisconnectMessage {
  export type AsObject = {
  }
}

export class PeerRegisterRequest extends jspb.Message {
  getEndpoint(): string;
  setEndpoint(value: string): void;

  getProtocolVersion(): number;
  setProtocolVersion(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PeerRegisterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PeerRegisterRequest): PeerRegisterRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PeerRegisterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PeerRegisterRequest;
  static deserializeBinaryFromReader(message: PeerRegisterRequest, reader: jspb.BinaryReader): PeerRegisterRequest;
}

export namespace PeerRegisterRequest {
  export type AsObject = {
    endpoint: string,
    protocolVersion: number,
  }
}

export class PeerUnregisterRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PeerUnregisterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PeerUnregisterRequest): PeerUnregisterRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PeerUnregisterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PeerUnregisterRequest;
  static deserializeBinaryFromReader(message: PeerUnregisterRequest, reader: jspb.BinaryReader): PeerUnregisterRequest;
}

export namespace PeerUnregisterRequest {
  export type AsObject = {
  }
}

export class GetPeersRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPeersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetPeersRequest): GetPeersRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetPeersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPeersRequest;
  static deserializeBinaryFromReader(message: GetPeersRequest, reader: jspb.BinaryReader): GetPeersRequest;
}

export namespace GetPeersRequest {
  export type AsObject = {
  }
}

export class GetPeersResponse extends jspb.Message {
  clearPeerEndpointsList(): void;
  getPeerEndpointsList(): Array<string>;
  setPeerEndpointsList(value: Array<string>): void;
  addPeerEndpoints(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPeersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetPeersResponse): GetPeersResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetPeersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPeersResponse;
  static deserializeBinaryFromReader(message: GetPeersResponse, reader: jspb.BinaryReader): GetPeersResponse;
}

export namespace GetPeersResponse {
  export type AsObject = {
    peerEndpointsList: Array<string>,
  }
}

export class PingRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PingRequest): PingRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingRequest;
  static deserializeBinaryFromReader(message: PingRequest, reader: jspb.BinaryReader): PingRequest;
}

export namespace PingRequest {
  export type AsObject = {
  }
}

export class PingResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PingResponse): PingResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PingResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingResponse;
  static deserializeBinaryFromReader(message: PingResponse, reader: jspb.BinaryReader): PingResponse;
}

export namespace PingResponse {
  export type AsObject = {
  }
}

export class GossipMessage extends jspb.Message {
  getContent(): Uint8Array | string;
  getContent_asU8(): Uint8Array;
  getContent_asB64(): string;
  setContent(value: Uint8Array | string): void;

  getContentType(): GossipMessage.ContentType;
  setContentType(value: GossipMessage.ContentType): void;

  getTimeToLive(): number;
  setTimeToLive(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GossipMessage.AsObject;
  static toObject(includeInstance: boolean, msg: GossipMessage): GossipMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GossipMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GossipMessage;
  static deserializeBinaryFromReader(message: GossipMessage, reader: jspb.BinaryReader): GossipMessage;
}

export namespace GossipMessage {
  export type AsObject = {
    content: Uint8Array | string,
    contentType: GossipMessage.ContentType,
    timeToLive: number,
  }

  export enum ContentType {
    CONTENT_TYPE_UNSET = 0,
    BLOCK = 1,
    BATCH = 2,
  }
}

export class NetworkAcknowledgement extends jspb.Message {
  getStatus(): NetworkAcknowledgement.Status;
  setStatus(value: NetworkAcknowledgement.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NetworkAcknowledgement.AsObject;
  static toObject(includeInstance: boolean, msg: NetworkAcknowledgement): NetworkAcknowledgement.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NetworkAcknowledgement, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NetworkAcknowledgement;
  static deserializeBinaryFromReader(message: NetworkAcknowledgement, reader: jspb.BinaryReader): NetworkAcknowledgement;
}

export namespace NetworkAcknowledgement {
  export type AsObject = {
    status: NetworkAcknowledgement.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    ERROR = 2,
  }
}

export class GossipBlockRequest extends jspb.Message {
  getBlockId(): string;
  setBlockId(value: string): void;

  getNonce(): string;
  setNonce(value: string): void;

  getTimeToLive(): number;
  setTimeToLive(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GossipBlockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GossipBlockRequest): GossipBlockRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GossipBlockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GossipBlockRequest;
  static deserializeBinaryFromReader(message: GossipBlockRequest, reader: jspb.BinaryReader): GossipBlockRequest;
}

export namespace GossipBlockRequest {
  export type AsObject = {
    blockId: string,
    nonce: string,
    timeToLive: number,
  }
}

export class GossipBlockResponse extends jspb.Message {
  getContent(): Uint8Array | string;
  getContent_asU8(): Uint8Array;
  getContent_asB64(): string;
  setContent(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GossipBlockResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GossipBlockResponse): GossipBlockResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GossipBlockResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GossipBlockResponse;
  static deserializeBinaryFromReader(message: GossipBlockResponse, reader: jspb.BinaryReader): GossipBlockResponse;
}

export namespace GossipBlockResponse {
  export type AsObject = {
    content: Uint8Array | string,
  }
}

export class GossipBatchResponse extends jspb.Message {
  getContent(): Uint8Array | string;
  getContent_asU8(): Uint8Array;
  getContent_asB64(): string;
  setContent(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GossipBatchResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GossipBatchResponse): GossipBatchResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GossipBatchResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GossipBatchResponse;
  static deserializeBinaryFromReader(message: GossipBatchResponse, reader: jspb.BinaryReader): GossipBatchResponse;
}

export namespace GossipBatchResponse {
  export type AsObject = {
    content: Uint8Array | string,
  }
}

export class GossipBatchByBatchIdRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getNonce(): string;
  setNonce(value: string): void;

  getTimeToLive(): number;
  setTimeToLive(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GossipBatchByBatchIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GossipBatchByBatchIdRequest): GossipBatchByBatchIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GossipBatchByBatchIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GossipBatchByBatchIdRequest;
  static deserializeBinaryFromReader(message: GossipBatchByBatchIdRequest, reader: jspb.BinaryReader): GossipBatchByBatchIdRequest;
}

export namespace GossipBatchByBatchIdRequest {
  export type AsObject = {
    id: string,
    nonce: string,
    timeToLive: number,
  }
}

export class GossipBatchByTransactionIdRequest extends jspb.Message {
  clearIdsList(): void;
  getIdsList(): Array<string>;
  setIdsList(value: Array<string>): void;
  addIds(value: string, index?: number): string;

  getNonce(): string;
  setNonce(value: string): void;

  getTimeToLive(): number;
  setTimeToLive(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GossipBatchByTransactionIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GossipBatchByTransactionIdRequest): GossipBatchByTransactionIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GossipBatchByTransactionIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GossipBatchByTransactionIdRequest;
  static deserializeBinaryFromReader(message: GossipBatchByTransactionIdRequest, reader: jspb.BinaryReader): GossipBatchByTransactionIdRequest;
}

export namespace GossipBatchByTransactionIdRequest {
  export type AsObject = {
    idsList: Array<string>,
    nonce: string,
    timeToLive: number,
  }
}

export class GossipConsensusMessage extends jspb.Message {
  getMessage(): Uint8Array | string;
  getMessage_asU8(): Uint8Array;
  getMessage_asB64(): string;
  setMessage(value: Uint8Array | string): void;

  getSenderId(): Uint8Array | string;
  getSenderId_asU8(): Uint8Array;
  getSenderId_asB64(): string;
  setSenderId(value: Uint8Array | string): void;

  getTimeToLive(): number;
  setTimeToLive(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GossipConsensusMessage.AsObject;
  static toObject(includeInstance: boolean, msg: GossipConsensusMessage): GossipConsensusMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GossipConsensusMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GossipConsensusMessage;
  static deserializeBinaryFromReader(message: GossipConsensusMessage, reader: jspb.BinaryReader): GossipConsensusMessage;
}

export namespace GossipConsensusMessage {
  export type AsObject = {
    message: Uint8Array | string,
    senderId: Uint8Array | string,
    timeToLive: number,
  }
}

