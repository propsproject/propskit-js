// package: 
// file: client_event.proto

import * as jspb from "google-protobuf";
import * as events_pb from "./events_pb";

export class ClientEventsSubscribeRequest extends jspb.Message {
  clearSubscriptionsList(): void;
  getSubscriptionsList(): Array<events_pb.EventSubscription>;
  setSubscriptionsList(value: Array<events_pb.EventSubscription>): void;
  addSubscriptions(value?: events_pb.EventSubscription, index?: number): events_pb.EventSubscription;

  clearLastKnownBlockIdsList(): void;
  getLastKnownBlockIdsList(): Array<string>;
  setLastKnownBlockIdsList(value: Array<string>): void;
  addLastKnownBlockIds(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientEventsSubscribeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientEventsSubscribeRequest): ClientEventsSubscribeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientEventsSubscribeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientEventsSubscribeRequest;
  static deserializeBinaryFromReader(message: ClientEventsSubscribeRequest, reader: jspb.BinaryReader): ClientEventsSubscribeRequest;
}

export namespace ClientEventsSubscribeRequest {
  export type AsObject = {
    subscriptionsList: Array<events_pb.EventSubscription.AsObject>,
    lastKnownBlockIdsList: Array<string>,
  }
}

export class ClientEventsSubscribeResponse extends jspb.Message {
  getStatus(): ClientEventsSubscribeResponse.Status;
  setStatus(value: ClientEventsSubscribeResponse.Status): void;

  getResponseMessage(): string;
  setResponseMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientEventsSubscribeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientEventsSubscribeResponse): ClientEventsSubscribeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientEventsSubscribeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientEventsSubscribeResponse;
  static deserializeBinaryFromReader(message: ClientEventsSubscribeResponse, reader: jspb.BinaryReader): ClientEventsSubscribeResponse;
}

export namespace ClientEventsSubscribeResponse {
  export type AsObject = {
    status: ClientEventsSubscribeResponse.Status,
    responseMessage: string,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    INVALID_FILTER = 2,
    UNKNOWN_BLOCK = 3,
  }
}

export class ClientEventsUnsubscribeRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientEventsUnsubscribeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientEventsUnsubscribeRequest): ClientEventsUnsubscribeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientEventsUnsubscribeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientEventsUnsubscribeRequest;
  static deserializeBinaryFromReader(message: ClientEventsUnsubscribeRequest, reader: jspb.BinaryReader): ClientEventsUnsubscribeRequest;
}

export namespace ClientEventsUnsubscribeRequest {
  export type AsObject = {
  }
}

export class ClientEventsUnsubscribeResponse extends jspb.Message {
  getStatus(): ClientEventsUnsubscribeResponse.Status;
  setStatus(value: ClientEventsUnsubscribeResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientEventsUnsubscribeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientEventsUnsubscribeResponse): ClientEventsUnsubscribeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientEventsUnsubscribeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientEventsUnsubscribeResponse;
  static deserializeBinaryFromReader(message: ClientEventsUnsubscribeResponse, reader: jspb.BinaryReader): ClientEventsUnsubscribeResponse;
}

export namespace ClientEventsUnsubscribeResponse {
  export type AsObject = {
    status: ClientEventsUnsubscribeResponse.Status,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    INTERNAL_ERROR = 2,
  }
}

export class ClientEventsGetRequest extends jspb.Message {
  clearSubscriptionsList(): void;
  getSubscriptionsList(): Array<events_pb.EventSubscription>;
  setSubscriptionsList(value: Array<events_pb.EventSubscription>): void;
  addSubscriptions(value?: events_pb.EventSubscription, index?: number): events_pb.EventSubscription;

  clearBlockIdsList(): void;
  getBlockIdsList(): Array<string>;
  setBlockIdsList(value: Array<string>): void;
  addBlockIds(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientEventsGetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientEventsGetRequest): ClientEventsGetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientEventsGetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientEventsGetRequest;
  static deserializeBinaryFromReader(message: ClientEventsGetRequest, reader: jspb.BinaryReader): ClientEventsGetRequest;
}

export namespace ClientEventsGetRequest {
  export type AsObject = {
    subscriptionsList: Array<events_pb.EventSubscription.AsObject>,
    blockIdsList: Array<string>,
  }
}

export class ClientEventsGetResponse extends jspb.Message {
  getStatus(): ClientEventsGetResponse.Status;
  setStatus(value: ClientEventsGetResponse.Status): void;

  clearEventsList(): void;
  getEventsList(): Array<events_pb.Event>;
  setEventsList(value: Array<events_pb.Event>): void;
  addEvents(value?: events_pb.Event, index?: number): events_pb.Event;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientEventsGetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ClientEventsGetResponse): ClientEventsGetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClientEventsGetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientEventsGetResponse;
  static deserializeBinaryFromReader(message: ClientEventsGetResponse, reader: jspb.BinaryReader): ClientEventsGetResponse;
}

export namespace ClientEventsGetResponse {
  export type AsObject = {
    status: ClientEventsGetResponse.Status,
    eventsList: Array<events_pb.Event.AsObject>,
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    INTERNAL_ERROR = 2,
    INVALID_FILTER = 3,
    UNKNOWN_BLOCK = 4,
  }
}

