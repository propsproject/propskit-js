// package: 
// file: authorization.proto

import * as jspb from "google-protobuf";

export class ConnectionRequest extends jspb.Message {
  getEndpoint(): string;
  setEndpoint(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConnectionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConnectionRequest): ConnectionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConnectionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConnectionRequest;
  static deserializeBinaryFromReader(message: ConnectionRequest, reader: jspb.BinaryReader): ConnectionRequest;
}

export namespace ConnectionRequest {
  export type AsObject = {
    endpoint: string,
  }
}

export class ConnectionResponse extends jspb.Message {
  clearRolesList(): void;
  getRolesList(): Array<ConnectionResponse.RoleEntry>;
  setRolesList(value: Array<ConnectionResponse.RoleEntry>): void;
  addRoles(value?: ConnectionResponse.RoleEntry, index?: number): ConnectionResponse.RoleEntry;

  getStatus(): ConnectionResponse.Status;
  setStatus(value: ConnectionResponse.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConnectionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConnectionResponse): ConnectionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConnectionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConnectionResponse;
  static deserializeBinaryFromReader(message: ConnectionResponse, reader: jspb.BinaryReader): ConnectionResponse;
}

export namespace ConnectionResponse {
  export type AsObject = {
    rolesList: Array<ConnectionResponse.RoleEntry.AsObject>,
    status: ConnectionResponse.Status,
  }

  export class RoleEntry extends jspb.Message {
    getRole(): RoleType;
    setRole(value: RoleType): void;

    getAuthType(): ConnectionResponse.AuthorizationType;
    setAuthType(value: ConnectionResponse.AuthorizationType): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RoleEntry.AsObject;
    static toObject(includeInstance: boolean, msg: RoleEntry): RoleEntry.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RoleEntry, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RoleEntry;
    static deserializeBinaryFromReader(message: RoleEntry, reader: jspb.BinaryReader): RoleEntry;
  }

  export namespace RoleEntry {
    export type AsObject = {
      role: RoleType,
      authType: ConnectionResponse.AuthorizationType,
    }
  }

  export enum Status {
    STATUS_UNSET = 0,
    OK = 1,
    ERROR = 2,
  }

  export enum AuthorizationType {
    AUTHORIZATION_TYPE_UNSET = 0,
    TRUST = 1,
    CHALLENGE = 2,
  }
}

export class AuthorizationTrustRequest extends jspb.Message {
  clearRolesList(): void;
  getRolesList(): Array<RoleType>;
  setRolesList(value: Array<RoleType>): void;
  addRoles(value: RoleType, index?: number): RoleType;

  getPublicKey(): string;
  setPublicKey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthorizationTrustRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AuthorizationTrustRequest): AuthorizationTrustRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AuthorizationTrustRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthorizationTrustRequest;
  static deserializeBinaryFromReader(message: AuthorizationTrustRequest, reader: jspb.BinaryReader): AuthorizationTrustRequest;
}

export namespace AuthorizationTrustRequest {
  export type AsObject = {
    rolesList: Array<RoleType>,
    publicKey: string,
  }
}

export class AuthorizationTrustResponse extends jspb.Message {
  clearRolesList(): void;
  getRolesList(): Array<RoleType>;
  setRolesList(value: Array<RoleType>): void;
  addRoles(value: RoleType, index?: number): RoleType;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthorizationTrustResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AuthorizationTrustResponse): AuthorizationTrustResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AuthorizationTrustResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthorizationTrustResponse;
  static deserializeBinaryFromReader(message: AuthorizationTrustResponse, reader: jspb.BinaryReader): AuthorizationTrustResponse;
}

export namespace AuthorizationTrustResponse {
  export type AsObject = {
    rolesList: Array<RoleType>,
  }
}

export class AuthorizationViolation extends jspb.Message {
  getViolation(): RoleType;
  setViolation(value: RoleType): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthorizationViolation.AsObject;
  static toObject(includeInstance: boolean, msg: AuthorizationViolation): AuthorizationViolation.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AuthorizationViolation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthorizationViolation;
  static deserializeBinaryFromReader(message: AuthorizationViolation, reader: jspb.BinaryReader): AuthorizationViolation;
}

export namespace AuthorizationViolation {
  export type AsObject = {
    violation: RoleType,
  }
}

export class AuthorizationChallengeRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthorizationChallengeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AuthorizationChallengeRequest): AuthorizationChallengeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AuthorizationChallengeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthorizationChallengeRequest;
  static deserializeBinaryFromReader(message: AuthorizationChallengeRequest, reader: jspb.BinaryReader): AuthorizationChallengeRequest;
}

export namespace AuthorizationChallengeRequest {
  export type AsObject = {
  }
}

export class AuthorizationChallengeResponse extends jspb.Message {
  getPayload(): Uint8Array | string;
  getPayload_asU8(): Uint8Array;
  getPayload_asB64(): string;
  setPayload(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthorizationChallengeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AuthorizationChallengeResponse): AuthorizationChallengeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AuthorizationChallengeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthorizationChallengeResponse;
  static deserializeBinaryFromReader(message: AuthorizationChallengeResponse, reader: jspb.BinaryReader): AuthorizationChallengeResponse;
}

export namespace AuthorizationChallengeResponse {
  export type AsObject = {
    payload: Uint8Array | string,
  }
}

export class AuthorizationChallengeSubmit extends jspb.Message {
  getPublicKey(): string;
  setPublicKey(value: string): void;

  getSignature(): string;
  setSignature(value: string): void;

  clearRolesList(): void;
  getRolesList(): Array<RoleType>;
  setRolesList(value: Array<RoleType>): void;
  addRoles(value: RoleType, index?: number): RoleType;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthorizationChallengeSubmit.AsObject;
  static toObject(includeInstance: boolean, msg: AuthorizationChallengeSubmit): AuthorizationChallengeSubmit.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AuthorizationChallengeSubmit, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthorizationChallengeSubmit;
  static deserializeBinaryFromReader(message: AuthorizationChallengeSubmit, reader: jspb.BinaryReader): AuthorizationChallengeSubmit;
}

export namespace AuthorizationChallengeSubmit {
  export type AsObject = {
    publicKey: string,
    signature: string,
    rolesList: Array<RoleType>,
  }
}

export class AuthorizationChallengeResult extends jspb.Message {
  clearRolesList(): void;
  getRolesList(): Array<RoleType>;
  setRolesList(value: Array<RoleType>): void;
  addRoles(value: RoleType, index?: number): RoleType;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthorizationChallengeResult.AsObject;
  static toObject(includeInstance: boolean, msg: AuthorizationChallengeResult): AuthorizationChallengeResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AuthorizationChallengeResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthorizationChallengeResult;
  static deserializeBinaryFromReader(message: AuthorizationChallengeResult, reader: jspb.BinaryReader): AuthorizationChallengeResult;
}

export namespace AuthorizationChallengeResult {
  export type AsObject = {
    rolesList: Array<RoleType>,
  }
}

export enum RoleType {
  ROLE_TYPE_UNSET = 0,
  ALL = 1,
  NETWORK = 2,
}

