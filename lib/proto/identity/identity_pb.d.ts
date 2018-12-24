// package: 
// file: identity.proto

import * as jspb from "google-protobuf";

export class Policy extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  clearEntriesList(): void;
  getEntriesList(): Array<Policy.Entry>;
  setEntriesList(value: Array<Policy.Entry>): void;
  addEntries(value?: Policy.Entry, index?: number): Policy.Entry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Policy.AsObject;
  static toObject(includeInstance: boolean, msg: Policy): Policy.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Policy, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Policy;
  static deserializeBinaryFromReader(message: Policy, reader: jspb.BinaryReader): Policy;
}

export namespace Policy {
  export type AsObject = {
    name: string,
    entriesList: Array<Policy.Entry.AsObject>,
  }

  export class Entry extends jspb.Message {
    getType(): Policy.EntryType;
    setType(value: Policy.EntryType): void;

    getKey(): string;
    setKey(value: string): void;

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
      type: Policy.EntryType,
      key: string,
    }
  }

  export enum EntryType {
    ENTRY_TYPE_UNSET = 0,
    PERMIT_KEY = 1,
    DENY_KEY = 2,
  }
}

export class PolicyList extends jspb.Message {
  clearPoliciesList(): void;
  getPoliciesList(): Array<Policy>;
  setPoliciesList(value: Array<Policy>): void;
  addPolicies(value?: Policy, index?: number): Policy;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PolicyList.AsObject;
  static toObject(includeInstance: boolean, msg: PolicyList): PolicyList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PolicyList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PolicyList;
  static deserializeBinaryFromReader(message: PolicyList, reader: jspb.BinaryReader): PolicyList;
}

export namespace PolicyList {
  export type AsObject = {
    policiesList: Array<Policy.AsObject>,
  }
}

export class Role extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getPolicyName(): string;
  setPolicyName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Role.AsObject;
  static toObject(includeInstance: boolean, msg: Role): Role.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Role, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Role;
  static deserializeBinaryFromReader(message: Role, reader: jspb.BinaryReader): Role;
}

export namespace Role {
  export type AsObject = {
    name: string,
    policyName: string,
  }
}

export class RoleList extends jspb.Message {
  clearRolesList(): void;
  getRolesList(): Array<Role>;
  setRolesList(value: Array<Role>): void;
  addRoles(value?: Role, index?: number): Role;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoleList.AsObject;
  static toObject(includeInstance: boolean, msg: RoleList): RoleList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RoleList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoleList;
  static deserializeBinaryFromReader(message: RoleList, reader: jspb.BinaryReader): RoleList;
}

export namespace RoleList {
  export type AsObject = {
    rolesList: Array<Role.AsObject>,
  }
}

