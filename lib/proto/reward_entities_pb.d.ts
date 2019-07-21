// package: pending_props_pb
// file: reward_entities.proto

import * as jspb from "google-protobuf";

export class RewardEntity extends jspb.Message {
  getType(): RewardEntityType;
  setType(value: RewardEntityType): void;

  getName(): string;
  setName(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getRewardsaddress(): string;
  setRewardsaddress(value: string): void;

  getSidechainaddress(): string;
  setSidechainaddress(value: string): void;

  getStatus(): RewardEntityState;
  setStatus(value: RewardEntityState): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RewardEntity.AsObject;
  static toObject(includeInstance: boolean, msg: RewardEntity): RewardEntity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RewardEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RewardEntity;
  static deserializeBinaryFromReader(message: RewardEntity, reader: jspb.BinaryReader): RewardEntity;
}

export namespace RewardEntity {
  export type AsObject = {
    type: RewardEntityType,
    name: string,
    address: string,
    rewardsaddress: string,
    sidechainaddress: string,
    status: RewardEntityState,
  }
}

export enum RewardEntityType {
  VALIDATOR = 0,
  APPLICATION = 1,
}

export enum RewardEntityState {
  ACTIVE = 0,
  INACTIVE = 1,
}

