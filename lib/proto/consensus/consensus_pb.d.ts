// package: 
// file: consensus.proto

import * as jspb from "google-protobuf";

export class ConsensusPeerMessage extends jspb.Message {
  getMessageType(): string;
  setMessageType(value: string): void;

  getContent(): Uint8Array | string;
  getContent_asU8(): Uint8Array;
  getContent_asB64(): string;
  setContent(value: Uint8Array | string): void;

  getName(): string;
  setName(value: string): void;

  getVersion(): string;
  setVersion(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusPeerMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusPeerMessage): ConsensusPeerMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusPeerMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusPeerMessage;
  static deserializeBinaryFromReader(message: ConsensusPeerMessage, reader: jspb.BinaryReader): ConsensusPeerMessage;
}

export namespace ConsensusPeerMessage {
  export type AsObject = {
    messageType: string,
    content: Uint8Array | string,
    name: string,
    version: string,
  }
}

export class ConsensusBlock extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  getPreviousId(): Uint8Array | string;
  getPreviousId_asU8(): Uint8Array;
  getPreviousId_asB64(): string;
  setPreviousId(value: Uint8Array | string): void;

  getSignerId(): Uint8Array | string;
  getSignerId_asU8(): Uint8Array;
  getSignerId_asB64(): string;
  setSignerId(value: Uint8Array | string): void;

  getBlockNum(): number;
  setBlockNum(value: number): void;

  getPayload(): Uint8Array | string;
  getPayload_asU8(): Uint8Array;
  getPayload_asB64(): string;
  setPayload(value: Uint8Array | string): void;

  getSummary(): Uint8Array | string;
  getSummary_asU8(): Uint8Array;
  getSummary_asB64(): string;
  setSummary(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusBlock.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusBlock): ConsensusBlock.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusBlock, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusBlock;
  static deserializeBinaryFromReader(message: ConsensusBlock, reader: jspb.BinaryReader): ConsensusBlock;
}

export namespace ConsensusBlock {
  export type AsObject = {
    blockId: Uint8Array | string,
    previousId: Uint8Array | string,
    signerId: Uint8Array | string,
    blockNum: number,
    payload: Uint8Array | string,
    summary: Uint8Array | string,
  }
}

export class ConsensusPeerInfo extends jspb.Message {
  getPeerId(): Uint8Array | string;
  getPeerId_asU8(): Uint8Array;
  getPeerId_asB64(): string;
  setPeerId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusPeerInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusPeerInfo): ConsensusPeerInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusPeerInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusPeerInfo;
  static deserializeBinaryFromReader(message: ConsensusPeerInfo, reader: jspb.BinaryReader): ConsensusPeerInfo;
}

export namespace ConsensusPeerInfo {
  export type AsObject = {
    peerId: Uint8Array | string,
  }
}

export class ConsensusSettingsEntry extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusSettingsEntry.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusSettingsEntry): ConsensusSettingsEntry.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusSettingsEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusSettingsEntry;
  static deserializeBinaryFromReader(message: ConsensusSettingsEntry, reader: jspb.BinaryReader): ConsensusSettingsEntry;
}

export namespace ConsensusSettingsEntry {
  export type AsObject = {
    key: string,
    value: string,
  }
}

export class ConsensusStateEntry extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusStateEntry.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusStateEntry): ConsensusStateEntry.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusStateEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusStateEntry;
  static deserializeBinaryFromReader(message: ConsensusStateEntry, reader: jspb.BinaryReader): ConsensusStateEntry;
}

export namespace ConsensusStateEntry {
  export type AsObject = {
    address: string,
    data: Uint8Array | string,
  }
}

export class ConsensusRegisterRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getVersion(): string;
  setVersion(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusRegisterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusRegisterRequest): ConsensusRegisterRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusRegisterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusRegisterRequest;
  static deserializeBinaryFromReader(message: ConsensusRegisterRequest, reader: jspb.BinaryReader): ConsensusRegisterRequest;
}

export namespace ConsensusRegisterRequest {
  export type AsObject = {
    name: string,
    version: string,
  }
}

export class ConsensusRegisterResponse extends jspb.Message {
  getStatus(): ConsensusRegisterResponse.Status;
  setStatus(value: ConsensusRegisterResponse.Status): void;

  hasChainHead(): boolean;
  clearChainHead(): void;
  getChainHead(): ConsensusBlock | undefined;
  setChainHead(value?: ConsensusBlock): void;

  clearPeersList(): void;
  getPeersList(): Array<ConsensusPeerInfo>;
  setPeersList(value: Array<ConsensusPeerInfo>): void;
  addPeers(value?: ConsensusPeerInfo, index?: number): ConsensusPeerInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusRegisterResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusRegisterResponse): ConsensusRegisterResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusRegisterResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusRegisterResponse;
  static deserializeBinaryFromReader(message: ConsensusRegisterResponse, reader: jspb.BinaryReader): ConsensusRegisterResponse;
}

export namespace ConsensusRegisterResponse {
  export type AsObject = {
    status: ConsensusRegisterResponse.Status,
    chainHead?: ConsensusBlock.AsObject,
    peersList: Array<ConsensusPeerInfo.AsObject>,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    BAD_REQUEST = 2,
    SERVICE_ERROR = 3,
    NOT_READY = 4,
  }
}

export class ConsensusNotifyPeerConnected extends jspb.Message {
  hasPeerInfo(): boolean;
  clearPeerInfo(): void;
  getPeerInfo(): ConsensusPeerInfo | undefined;
  setPeerInfo(value?: ConsensusPeerInfo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusNotifyPeerConnected.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusNotifyPeerConnected): ConsensusNotifyPeerConnected.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusNotifyPeerConnected, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusNotifyPeerConnected;
  static deserializeBinaryFromReader(message: ConsensusNotifyPeerConnected, reader: jspb.BinaryReader): ConsensusNotifyPeerConnected;
}

export namespace ConsensusNotifyPeerConnected {
  export type AsObject = {
    peerInfo?: ConsensusPeerInfo.AsObject,
  }
}

export class ConsensusNotifyPeerDisconnected extends jspb.Message {
  getPeerId(): Uint8Array | string;
  getPeerId_asU8(): Uint8Array;
  getPeerId_asB64(): string;
  setPeerId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusNotifyPeerDisconnected.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusNotifyPeerDisconnected): ConsensusNotifyPeerDisconnected.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusNotifyPeerDisconnected, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusNotifyPeerDisconnected;
  static deserializeBinaryFromReader(message: ConsensusNotifyPeerDisconnected, reader: jspb.BinaryReader): ConsensusNotifyPeerDisconnected;
}

export namespace ConsensusNotifyPeerDisconnected {
  export type AsObject = {
    peerId: Uint8Array | string,
  }
}

export class ConsensusNotifyPeerMessage extends jspb.Message {
  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): ConsensusPeerMessage | undefined;
  setMessage(value?: ConsensusPeerMessage): void;

  getSenderId(): Uint8Array | string;
  getSenderId_asU8(): Uint8Array;
  getSenderId_asB64(): string;
  setSenderId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusNotifyPeerMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusNotifyPeerMessage): ConsensusNotifyPeerMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusNotifyPeerMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusNotifyPeerMessage;
  static deserializeBinaryFromReader(message: ConsensusNotifyPeerMessage, reader: jspb.BinaryReader): ConsensusNotifyPeerMessage;
}

export namespace ConsensusNotifyPeerMessage {
  export type AsObject = {
    message?: ConsensusPeerMessage.AsObject,
    senderId: Uint8Array | string,
  }
}

export class ConsensusNotifyBlockNew extends jspb.Message {
  hasBlock(): boolean;
  clearBlock(): void;
  getBlock(): ConsensusBlock | undefined;
  setBlock(value?: ConsensusBlock): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusNotifyBlockNew.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusNotifyBlockNew): ConsensusNotifyBlockNew.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusNotifyBlockNew, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusNotifyBlockNew;
  static deserializeBinaryFromReader(message: ConsensusNotifyBlockNew, reader: jspb.BinaryReader): ConsensusNotifyBlockNew;
}

export namespace ConsensusNotifyBlockNew {
  export type AsObject = {
    block?: ConsensusBlock.AsObject,
  }
}

export class ConsensusNotifyBlockValid extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusNotifyBlockValid.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusNotifyBlockValid): ConsensusNotifyBlockValid.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusNotifyBlockValid, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusNotifyBlockValid;
  static deserializeBinaryFromReader(message: ConsensusNotifyBlockValid, reader: jspb.BinaryReader): ConsensusNotifyBlockValid;
}

export namespace ConsensusNotifyBlockValid {
  export type AsObject = {
    blockId: Uint8Array | string,
  }
}

export class ConsensusNotifyBlockInvalid extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusNotifyBlockInvalid.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusNotifyBlockInvalid): ConsensusNotifyBlockInvalid.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusNotifyBlockInvalid, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusNotifyBlockInvalid;
  static deserializeBinaryFromReader(message: ConsensusNotifyBlockInvalid, reader: jspb.BinaryReader): ConsensusNotifyBlockInvalid;
}

export namespace ConsensusNotifyBlockInvalid {
  export type AsObject = {
    blockId: Uint8Array | string,
  }
}

export class ConsensusNotifyBlockCommit extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusNotifyBlockCommit.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusNotifyBlockCommit): ConsensusNotifyBlockCommit.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusNotifyBlockCommit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusNotifyBlockCommit;
  static deserializeBinaryFromReader(message: ConsensusNotifyBlockCommit, reader: jspb.BinaryReader): ConsensusNotifyBlockCommit;
}

export namespace ConsensusNotifyBlockCommit {
  export type AsObject = {
    blockId: Uint8Array | string,
  }
}

export class ConsensusNotifyAck extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusNotifyAck.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusNotifyAck): ConsensusNotifyAck.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusNotifyAck, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusNotifyAck;
  static deserializeBinaryFromReader(message: ConsensusNotifyAck, reader: jspb.BinaryReader): ConsensusNotifyAck;
}

export namespace ConsensusNotifyAck {
  export type AsObject = {
  }
}

export class ConsensusSendToRequest extends jspb.Message {
  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): ConsensusPeerMessage | undefined;
  setMessage(value?: ConsensusPeerMessage): void;

  getPeerId(): Uint8Array | string;
  getPeerId_asU8(): Uint8Array;
  getPeerId_asB64(): string;
  setPeerId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusSendToRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusSendToRequest): ConsensusSendToRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusSendToRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusSendToRequest;
  static deserializeBinaryFromReader(message: ConsensusSendToRequest, reader: jspb.BinaryReader): ConsensusSendToRequest;
}

export namespace ConsensusSendToRequest {
  export type AsObject = {
    message?: ConsensusPeerMessage.AsObject,
    peerId: Uint8Array | string,
  }
}

export class ConsensusSendToResponse extends jspb.Message {
  getStatus(): ConsensusSendToResponse.Status;
  setStatus(value: ConsensusSendToResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusSendToResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusSendToResponse): ConsensusSendToResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusSendToResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusSendToResponse;
  static deserializeBinaryFromReader(message: ConsensusSendToResponse, reader: jspb.BinaryReader): ConsensusSendToResponse;
}

export namespace ConsensusSendToResponse {
  export type AsObject = {
    status: ConsensusSendToResponse.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    BAD_REQUEST = 2,
    SERVICE_ERROR = 3,
    NOT_READY = 4,
    UNKNOWN_PEER = 5,
  }
}

export class ConsensusBroadcastRequest extends jspb.Message {
  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): ConsensusPeerMessage | undefined;
  setMessage(value?: ConsensusPeerMessage): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusBroadcastRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusBroadcastRequest): ConsensusBroadcastRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusBroadcastRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusBroadcastRequest;
  static deserializeBinaryFromReader(message: ConsensusBroadcastRequest, reader: jspb.BinaryReader): ConsensusBroadcastRequest;
}

export namespace ConsensusBroadcastRequest {
  export type AsObject = {
    message?: ConsensusPeerMessage.AsObject,
  }
}

export class ConsensusBroadcastResponse extends jspb.Message {
  getStatus(): ConsensusBroadcastResponse.Status;
  setStatus(value: ConsensusBroadcastResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusBroadcastResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusBroadcastResponse): ConsensusBroadcastResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusBroadcastResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusBroadcastResponse;
  static deserializeBinaryFromReader(message: ConsensusBroadcastResponse, reader: jspb.BinaryReader): ConsensusBroadcastResponse;
}

export namespace ConsensusBroadcastResponse {
  export type AsObject = {
    status: ConsensusBroadcastResponse.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    BAD_REQUEST = 2,
    SERVICE_ERROR = 3,
    NOT_READY = 4,
  }
}

export class ConsensusInitializeBlockRequest extends jspb.Message {
  getPreviousId(): Uint8Array | string;
  getPreviousId_asU8(): Uint8Array;
  getPreviousId_asB64(): string;
  setPreviousId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusInitializeBlockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusInitializeBlockRequest): ConsensusInitializeBlockRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusInitializeBlockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusInitializeBlockRequest;
  static deserializeBinaryFromReader(message: ConsensusInitializeBlockRequest, reader: jspb.BinaryReader): ConsensusInitializeBlockRequest;
}

export namespace ConsensusInitializeBlockRequest {
  export type AsObject = {
    previousId: Uint8Array | string,
  }
}

export class ConsensusInitializeBlockResponse extends jspb.Message {
  getStatus(): ConsensusInitializeBlockResponse.Status;
  setStatus(value: ConsensusInitializeBlockResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusInitializeBlockResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusInitializeBlockResponse): ConsensusInitializeBlockResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusInitializeBlockResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusInitializeBlockResponse;
  static deserializeBinaryFromReader(message: ConsensusInitializeBlockResponse, reader: jspb.BinaryReader): ConsensusInitializeBlockResponse;
}

export namespace ConsensusInitializeBlockResponse {
  export type AsObject = {
    status: ConsensusInitializeBlockResponse.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    BAD_REQUEST = 2,
    SERVICE_ERROR = 3,
    NOT_READY = 4,
    INVALID_STATE = 5,
    UNKNOWN_BLOCK = 6,
  }
}

export class ConsensusSummarizeBlockRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusSummarizeBlockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusSummarizeBlockRequest): ConsensusSummarizeBlockRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusSummarizeBlockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusSummarizeBlockRequest;
  static deserializeBinaryFromReader(message: ConsensusSummarizeBlockRequest, reader: jspb.BinaryReader): ConsensusSummarizeBlockRequest;
}

export namespace ConsensusSummarizeBlockRequest {
  export type AsObject = {
  }
}

export class ConsensusSummarizeBlockResponse extends jspb.Message {
  getStatus(): ConsensusSummarizeBlockResponse.Status;
  setStatus(value: ConsensusSummarizeBlockResponse.Status): void;

  getSummary(): Uint8Array | string;
  getSummary_asU8(): Uint8Array;
  getSummary_asB64(): string;
  setSummary(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusSummarizeBlockResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusSummarizeBlockResponse): ConsensusSummarizeBlockResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusSummarizeBlockResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusSummarizeBlockResponse;
  static deserializeBinaryFromReader(message: ConsensusSummarizeBlockResponse, reader: jspb.BinaryReader): ConsensusSummarizeBlockResponse;
}

export namespace ConsensusSummarizeBlockResponse {
  export type AsObject = {
    status: ConsensusSummarizeBlockResponse.Status,
    summary: Uint8Array | string,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    BAD_REQUEST = 2,
    SERVICE_ERROR = 3,
    NOT_READY = 4,
    INVALID_STATE = 5,
    BLOCK_NOT_READY = 6,
  }
}

export class ConsensusFinalizeBlockRequest extends jspb.Message {
  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusFinalizeBlockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusFinalizeBlockRequest): ConsensusFinalizeBlockRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusFinalizeBlockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusFinalizeBlockRequest;
  static deserializeBinaryFromReader(message: ConsensusFinalizeBlockRequest, reader: jspb.BinaryReader): ConsensusFinalizeBlockRequest;
}

export namespace ConsensusFinalizeBlockRequest {
  export type AsObject = {
    data: Uint8Array | string,
  }
}

export class ConsensusFinalizeBlockResponse extends jspb.Message {
  getStatus(): ConsensusFinalizeBlockResponse.Status;
  setStatus(value: ConsensusFinalizeBlockResponse.Status): void;

  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusFinalizeBlockResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusFinalizeBlockResponse): ConsensusFinalizeBlockResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusFinalizeBlockResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusFinalizeBlockResponse;
  static deserializeBinaryFromReader(message: ConsensusFinalizeBlockResponse, reader: jspb.BinaryReader): ConsensusFinalizeBlockResponse;
}

export namespace ConsensusFinalizeBlockResponse {
  export type AsObject = {
    status: ConsensusFinalizeBlockResponse.Status,
    blockId: Uint8Array | string,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    BAD_REQUEST = 2,
    SERVICE_ERROR = 3,
    NOT_READY = 4,
    INVALID_STATE = 5,
    BLOCK_NOT_READY = 6,
  }
}

export class ConsensusCancelBlockRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusCancelBlockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusCancelBlockRequest): ConsensusCancelBlockRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusCancelBlockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusCancelBlockRequest;
  static deserializeBinaryFromReader(message: ConsensusCancelBlockRequest, reader: jspb.BinaryReader): ConsensusCancelBlockRequest;
}

export namespace ConsensusCancelBlockRequest {
  export type AsObject = {
  }
}

export class ConsensusCancelBlockResponse extends jspb.Message {
  getStatus(): ConsensusCancelBlockResponse.Status;
  setStatus(value: ConsensusCancelBlockResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusCancelBlockResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusCancelBlockResponse): ConsensusCancelBlockResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusCancelBlockResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusCancelBlockResponse;
  static deserializeBinaryFromReader(message: ConsensusCancelBlockResponse, reader: jspb.BinaryReader): ConsensusCancelBlockResponse;
}

export namespace ConsensusCancelBlockResponse {
  export type AsObject = {
    status: ConsensusCancelBlockResponse.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    BAD_REQUEST = 2,
    SERVICE_ERROR = 3,
    NOT_READY = 4,
    INVALID_STATE = 5,
  }
}

export class ConsensusCheckBlocksRequest extends jspb.Message {
  clearBlockIdsList(): void;
  getBlockIdsList(): Array<Uint8Array | string>;
  getBlockIdsList_asU8(): Array<Uint8Array>;
  getBlockIdsList_asB64(): Array<string>;
  setBlockIdsList(value: Array<Uint8Array | string>): void;
  addBlockIds(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusCheckBlocksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusCheckBlocksRequest): ConsensusCheckBlocksRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusCheckBlocksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusCheckBlocksRequest;
  static deserializeBinaryFromReader(message: ConsensusCheckBlocksRequest, reader: jspb.BinaryReader): ConsensusCheckBlocksRequest;
}

export namespace ConsensusCheckBlocksRequest {
  export type AsObject = {
    blockIdsList: Array<Uint8Array | string>,
  }
}

export class ConsensusCheckBlocksResponse extends jspb.Message {
  getStatus(): ConsensusCheckBlocksResponse.Status;
  setStatus(value: ConsensusCheckBlocksResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusCheckBlocksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusCheckBlocksResponse): ConsensusCheckBlocksResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusCheckBlocksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusCheckBlocksResponse;
  static deserializeBinaryFromReader(message: ConsensusCheckBlocksResponse, reader: jspb.BinaryReader): ConsensusCheckBlocksResponse;
}

export namespace ConsensusCheckBlocksResponse {
  export type AsObject = {
    status: ConsensusCheckBlocksResponse.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    BAD_REQUEST = 2,
    SERVICE_ERROR = 3,
    NOT_READY = 4,
    UNKNOWN_BLOCK = 5,
  }
}

export class ConsensusCommitBlockRequest extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusCommitBlockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusCommitBlockRequest): ConsensusCommitBlockRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusCommitBlockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusCommitBlockRequest;
  static deserializeBinaryFromReader(message: ConsensusCommitBlockRequest, reader: jspb.BinaryReader): ConsensusCommitBlockRequest;
}

export namespace ConsensusCommitBlockRequest {
  export type AsObject = {
    blockId: Uint8Array | string,
  }
}

export class ConsensusCommitBlockResponse extends jspb.Message {
  getStatus(): ConsensusCommitBlockResponse.Status;
  setStatus(value: ConsensusCommitBlockResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusCommitBlockResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusCommitBlockResponse): ConsensusCommitBlockResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusCommitBlockResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusCommitBlockResponse;
  static deserializeBinaryFromReader(message: ConsensusCommitBlockResponse, reader: jspb.BinaryReader): ConsensusCommitBlockResponse;
}

export namespace ConsensusCommitBlockResponse {
  export type AsObject = {
    status: ConsensusCommitBlockResponse.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    BAD_REQUEST = 2,
    SERVICE_ERROR = 3,
    NOT_READY = 4,
    UNKNOWN_BLOCK = 5,
  }
}

export class ConsensusIgnoreBlockRequest extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusIgnoreBlockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusIgnoreBlockRequest): ConsensusIgnoreBlockRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusIgnoreBlockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusIgnoreBlockRequest;
  static deserializeBinaryFromReader(message: ConsensusIgnoreBlockRequest, reader: jspb.BinaryReader): ConsensusIgnoreBlockRequest;
}

export namespace ConsensusIgnoreBlockRequest {
  export type AsObject = {
    blockId: Uint8Array | string,
  }
}

export class ConsensusIgnoreBlockResponse extends jspb.Message {
  getStatus(): ConsensusIgnoreBlockResponse.Status;
  setStatus(value: ConsensusIgnoreBlockResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusIgnoreBlockResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusIgnoreBlockResponse): ConsensusIgnoreBlockResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusIgnoreBlockResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusIgnoreBlockResponse;
  static deserializeBinaryFromReader(message: ConsensusIgnoreBlockResponse, reader: jspb.BinaryReader): ConsensusIgnoreBlockResponse;
}

export namespace ConsensusIgnoreBlockResponse {
  export type AsObject = {
    status: ConsensusIgnoreBlockResponse.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    BAD_REQUEST = 2,
    SERVICE_ERROR = 3,
    NOT_READY = 4,
    UNKNOWN_BLOCK = 5,
  }
}

export class ConsensusFailBlockRequest extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusFailBlockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusFailBlockRequest): ConsensusFailBlockRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusFailBlockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusFailBlockRequest;
  static deserializeBinaryFromReader(message: ConsensusFailBlockRequest, reader: jspb.BinaryReader): ConsensusFailBlockRequest;
}

export namespace ConsensusFailBlockRequest {
  export type AsObject = {
    blockId: Uint8Array | string,
  }
}

export class ConsensusFailBlockResponse extends jspb.Message {
  getStatus(): ConsensusFailBlockResponse.Status;
  setStatus(value: ConsensusFailBlockResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusFailBlockResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusFailBlockResponse): ConsensusFailBlockResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusFailBlockResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusFailBlockResponse;
  static deserializeBinaryFromReader(message: ConsensusFailBlockResponse, reader: jspb.BinaryReader): ConsensusFailBlockResponse;
}

export namespace ConsensusFailBlockResponse {
  export type AsObject = {
    status: ConsensusFailBlockResponse.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    BAD_REQUEST = 2,
    SERVICE_ERROR = 3,
    NOT_READY = 4,
    UNKNOWN_BLOCK = 5,
  }
}

export class ConsensusBlocksGetRequest extends jspb.Message {
  clearBlockIdsList(): void;
  getBlockIdsList(): Array<Uint8Array | string>;
  getBlockIdsList_asU8(): Array<Uint8Array>;
  getBlockIdsList_asB64(): Array<string>;
  setBlockIdsList(value: Array<Uint8Array | string>): void;
  addBlockIds(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusBlocksGetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusBlocksGetRequest): ConsensusBlocksGetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusBlocksGetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusBlocksGetRequest;
  static deserializeBinaryFromReader(message: ConsensusBlocksGetRequest, reader: jspb.BinaryReader): ConsensusBlocksGetRequest;
}

export namespace ConsensusBlocksGetRequest {
  export type AsObject = {
    blockIdsList: Array<Uint8Array | string>,
  }
}

export class ConsensusBlocksGetResponse extends jspb.Message {
  getStatus(): ConsensusBlocksGetResponse.Status;
  setStatus(value: ConsensusBlocksGetResponse.Status): void;

  clearBlocksList(): void;
  getBlocksList(): Array<ConsensusBlock>;
  setBlocksList(value: Array<ConsensusBlock>): void;
  addBlocks(value?: ConsensusBlock, index?: number): ConsensusBlock;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusBlocksGetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusBlocksGetResponse): ConsensusBlocksGetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusBlocksGetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusBlocksGetResponse;
  static deserializeBinaryFromReader(message: ConsensusBlocksGetResponse, reader: jspb.BinaryReader): ConsensusBlocksGetResponse;
}

export namespace ConsensusBlocksGetResponse {
  export type AsObject = {
    status: ConsensusBlocksGetResponse.Status,
    blocksList: Array<ConsensusBlock.AsObject>,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    BAD_REQUEST = 2,
    SERVICE_ERROR = 3,
    NOT_READY = 4,
    UNKNOWN_BLOCK = 5,
  }
}

export class ConsensusChainHeadGetRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusChainHeadGetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusChainHeadGetRequest): ConsensusChainHeadGetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusChainHeadGetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusChainHeadGetRequest;
  static deserializeBinaryFromReader(message: ConsensusChainHeadGetRequest, reader: jspb.BinaryReader): ConsensusChainHeadGetRequest;
}

export namespace ConsensusChainHeadGetRequest {
  export type AsObject = {
  }
}

export class ConsensusChainHeadGetResponse extends jspb.Message {
  getStatus(): ConsensusChainHeadGetResponse.Status;
  setStatus(value: ConsensusChainHeadGetResponse.Status): void;

  hasBlock(): boolean;
  clearBlock(): void;
  getBlock(): ConsensusBlock | undefined;
  setBlock(value?: ConsensusBlock): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusChainHeadGetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusChainHeadGetResponse): ConsensusChainHeadGetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusChainHeadGetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusChainHeadGetResponse;
  static deserializeBinaryFromReader(message: ConsensusChainHeadGetResponse, reader: jspb.BinaryReader): ConsensusChainHeadGetResponse;
}

export namespace ConsensusChainHeadGetResponse {
  export type AsObject = {
    status: ConsensusChainHeadGetResponse.Status,
    block?: ConsensusBlock.AsObject,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    BAD_REQUEST = 2,
    SERVICE_ERROR = 3,
    NOT_READY = 4,
    NO_CHAIN_HEAD = 5,
  }
}

export class ConsensusSettingsGetRequest extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  clearKeysList(): void;
  getKeysList(): Array<string>;
  setKeysList(value: Array<string>): void;
  addKeys(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusSettingsGetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusSettingsGetRequest): ConsensusSettingsGetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusSettingsGetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusSettingsGetRequest;
  static deserializeBinaryFromReader(message: ConsensusSettingsGetRequest, reader: jspb.BinaryReader): ConsensusSettingsGetRequest;
}

export namespace ConsensusSettingsGetRequest {
  export type AsObject = {
    blockId: Uint8Array | string,
    keysList: Array<string>,
  }
}

export class ConsensusSettingsGetResponse extends jspb.Message {
  getStatus(): ConsensusSettingsGetResponse.Status;
  setStatus(value: ConsensusSettingsGetResponse.Status): void;

  clearEntriesList(): void;
  getEntriesList(): Array<ConsensusSettingsEntry>;
  setEntriesList(value: Array<ConsensusSettingsEntry>): void;
  addEntries(value?: ConsensusSettingsEntry, index?: number): ConsensusSettingsEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusSettingsGetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusSettingsGetResponse): ConsensusSettingsGetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusSettingsGetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusSettingsGetResponse;
  static deserializeBinaryFromReader(message: ConsensusSettingsGetResponse, reader: jspb.BinaryReader): ConsensusSettingsGetResponse;
}

export namespace ConsensusSettingsGetResponse {
  export type AsObject = {
    status: ConsensusSettingsGetResponse.Status,
    entriesList: Array<ConsensusSettingsEntry.AsObject>,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    BAD_REQUEST = 2,
    SERVICE_ERROR = 3,
    NOT_READY = 4,
    UNKNOWN_BLOCK = 5,
  }
}

export class ConsensusStateGetRequest extends jspb.Message {
  getBlockId(): Uint8Array | string;
  getBlockId_asU8(): Uint8Array;
  getBlockId_asB64(): string;
  setBlockId(value: Uint8Array | string): void;

  clearAddressesList(): void;
  getAddressesList(): Array<string>;
  setAddressesList(value: Array<string>): void;
  addAddresses(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusStateGetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusStateGetRequest): ConsensusStateGetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusStateGetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusStateGetRequest;
  static deserializeBinaryFromReader(message: ConsensusStateGetRequest, reader: jspb.BinaryReader): ConsensusStateGetRequest;
}

export namespace ConsensusStateGetRequest {
  export type AsObject = {
    blockId: Uint8Array | string,
    addressesList: Array<string>,
  }
}

export class ConsensusStateGetResponse extends jspb.Message {
  getStatus(): ConsensusStateGetResponse.Status;
  setStatus(value: ConsensusStateGetResponse.Status): void;

  clearEntriesList(): void;
  getEntriesList(): Array<ConsensusStateEntry>;
  setEntriesList(value: Array<ConsensusStateEntry>): void;
  addEntries(value?: ConsensusStateEntry, index?: number): ConsensusStateEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusStateGetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusStateGetResponse): ConsensusStateGetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusStateGetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusStateGetResponse;
  static deserializeBinaryFromReader(message: ConsensusStateGetResponse, reader: jspb.BinaryReader): ConsensusStateGetResponse;
}

export namespace ConsensusStateGetResponse {
  export type AsObject = {
    status: ConsensusStateGetResponse.Status,
    entriesList: Array<ConsensusStateEntry.AsObject>,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    BAD_REQUEST = 2,
    SERVICE_ERROR = 3,
    NOT_READY = 4,
    UNKNOWN_BLOCK = 5,
  }
}

