// package: 
// file: events.proto

import * as jspb from "google-protobuf";

export class Event extends jspb.Message {
  getEventType(): string;
  setEventType(value: string): void;

  clearAttributesList(): void;
  getAttributesList(): Array<Event.Attribute>;
  setAttributesList(value: Array<Event.Attribute>): void;
  addAttributes(value?: Event.Attribute, index?: number): Event.Attribute;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Event.AsObject;
  static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Event;
  static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
}

export namespace Event {
  export type AsObject = {
    eventType: string,
    attributesList: Array<Event.Attribute.AsObject>,
    data: Uint8Array | string,
  }

  export class Attribute extends jspb.Message {
    getKey(): string;
    setKey(value: string): void;

    getValue(): string;
    setValue(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Attribute.AsObject;
    static toObject(includeInstance: boolean, msg: Attribute): Attribute.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Attribute, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Attribute;
    static deserializeBinaryFromReader(message: Attribute, reader: jspb.BinaryReader): Attribute;
  }

  export namespace Attribute {
    export type AsObject = {
      key: string,
      value: string,
    }
  }
}

export class EventList extends jspb.Message {
  clearEventsList(): void;
  getEventsList(): Array<Event>;
  setEventsList(value: Array<Event>): void;
  addEvents(value?: Event, index?: number): Event;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventList.AsObject;
  static toObject(includeInstance: boolean, msg: EventList): EventList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventList;
  static deserializeBinaryFromReader(message: EventList, reader: jspb.BinaryReader): EventList;
}

export namespace EventList {
  export type AsObject = {
    eventsList: Array<Event.AsObject>,
  }
}

export class EventFilter extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  getMatchString(): string;
  setMatchString(value: string): void;

  getFilterType(): EventFilter.FilterType;
  setFilterType(value: EventFilter.FilterType): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventFilter.AsObject;
  static toObject(includeInstance: boolean, msg: EventFilter): EventFilter.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventFilter;
  static deserializeBinaryFromReader(message: EventFilter, reader: jspb.BinaryReader): EventFilter;
}

export namespace EventFilter {
  export type AsObject = {
    key: string,
    matchString: string,
    filterType: EventFilter.FilterType,
  }

  export enum FilterType {
    FILTER_TYPE_UNSET = 0,
    SIMPLE_ANY = 1,
    SIMPLE_ALL = 2,
    REGEX_ANY = 3,
    REGEX_ALL = 4,
  }
}

export class EventSubscription extends jspb.Message {
  getEventType(): string;
  setEventType(value: string): void;

  clearFiltersList(): void;
  getFiltersList(): Array<EventFilter>;
  setFiltersList(value: Array<EventFilter>): void;
  addFilters(value?: EventFilter, index?: number): EventFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventSubscription.AsObject;
  static toObject(includeInstance: boolean, msg: EventSubscription): EventSubscription.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventSubscription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventSubscription;
  static deserializeBinaryFromReader(message: EventSubscription, reader: jspb.BinaryReader): EventSubscription;
}

export namespace EventSubscription {
  export type AsObject = {
    eventType: string,
    filtersList: Array<EventFilter.AsObject>,
  }
}

