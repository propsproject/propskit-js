// package: 
// file: validator.proto

import * as jspb from "google-protobuf";

export class MessageList extends jspb.Message {
  clearMessagesList(): void;
  getMessagesList(): Array<Message>;
  setMessagesList(value: Array<Message>): void;
  addMessages(value?: Message, index?: number): Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageList.AsObject;
  static toObject(includeInstance: boolean, msg: MessageList): MessageList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageList;
  static deserializeBinaryFromReader(message: MessageList, reader: jspb.BinaryReader): MessageList;
}

export namespace MessageList {
  export type AsObject = {
    messagesList: Array<Message.AsObject>,
  }
}

export class Message extends jspb.Message {
  getMessageType(): Message.MessageType;
  setMessageType(value: Message.MessageType): void;

  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getContent(): Uint8Array | string;
  getContent_asU8(): Uint8Array;
  getContent_asB64(): string;
  setContent(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    messageType: Message.MessageType,
    correlationId: string,
    content: Uint8Array | string,
  }

  export enum MessageType {
    DEFAULT = 0,
    TP_REGISTER_REQUEST = 1,
    TP_REGISTER_RESPONSE = 2,
    TP_UNREGISTER_REQUEST = 3,
    TP_UNREGISTER_RESPONSE = 4,
    TP_PROCESS_REQUEST = 5,
    TP_PROCESS_RESPONSE = 6,
    TP_STATE_GET_REQUEST = 7,
    TP_STATE_GET_RESPONSE = 8,
    TP_STATE_SET_REQUEST = 9,
    TP_STATE_SET_RESPONSE = 10,
    TP_STATE_DELETE_REQUEST = 11,
    TP_STATE_DELETE_RESPONSE = 12,
    TP_RECEIPT_ADD_DATA_REQUEST = 13,
    TP_RECEIPT_ADD_DATA_RESPONSE = 14,
    TP_EVENT_ADD_REQUEST = 15,
    TP_EVENT_ADD_RESPONSE = 16,
    CLIENT_BATCH_SUBMIT_REQUEST = 100,
    CLIENT_BATCH_SUBMIT_RESPONSE = 101,
    CLIENT_BLOCK_LIST_REQUEST = 102,
    CLIENT_BLOCK_LIST_RESPONSE = 103,
    CLIENT_BLOCK_GET_BY_ID_REQUEST = 104,
    CLIENT_BLOCK_GET_RESPONSE = 105,
    CLIENT_BATCH_LIST_REQUEST = 106,
    CLIENT_BATCH_LIST_RESPONSE = 107,
    CLIENT_BATCH_GET_REQUEST = 108,
    CLIENT_BATCH_GET_RESPONSE = 109,
    CLIENT_TRANSACTION_LIST_REQUEST = 110,
    CLIENT_TRANSACTION_LIST_RESPONSE = 111,
    CLIENT_TRANSACTION_GET_REQUEST = 112,
    CLIENT_TRANSACTION_GET_RESPONSE = 113,
    CLIENT_STATE_CURRENT_REQUEST = 114,
    CLIENT_STATE_CURRENT_RESPONSE = 115,
    CLIENT_STATE_LIST_REQUEST = 116,
    CLIENT_STATE_LIST_RESPONSE = 117,
    CLIENT_STATE_GET_REQUEST = 118,
    CLIENT_STATE_GET_RESPONSE = 119,
    CLIENT_BATCH_STATUS_REQUEST = 120,
    CLIENT_BATCH_STATUS_RESPONSE = 121,
    CLIENT_RECEIPT_GET_REQUEST = 122,
    CLIENT_RECEIPT_GET_RESPONSE = 123,
    CLIENT_BLOCK_GET_BY_NUM_REQUEST = 124,
    CLIENT_PEERS_GET_REQUEST = 125,
    CLIENT_PEERS_GET_RESPONSE = 126,
    CLIENT_BLOCK_GET_BY_TRANSACTION_ID_REQUEST = 127,
    CLIENT_BLOCK_GET_BY_BATCH_ID_REQUEST = 128,
    CLIENT_STATUS_GET_REQUEST = 129,
    CLIENT_STATUS_GET_RESPONSE = 130,
    CLIENT_EVENTS_SUBSCRIBE_REQUEST = 500,
    CLIENT_EVENTS_SUBSCRIBE_RESPONSE = 501,
    CLIENT_EVENTS_UNSUBSCRIBE_REQUEST = 502,
    CLIENT_EVENTS_UNSUBSCRIBE_RESPONSE = 503,
    CLIENT_EVENTS = 504,
    CLIENT_EVENTS_GET_REQUEST = 505,
    CLIENT_EVENTS_GET_RESPONSE = 506,
    GOSSIP_MESSAGE = 200,
    GOSSIP_REGISTER = 201,
    GOSSIP_UNREGISTER = 202,
    GOSSIP_BLOCK_REQUEST = 205,
    GOSSIP_BLOCK_RESPONSE = 206,
    GOSSIP_BATCH_BY_BATCH_ID_REQUEST = 207,
    GOSSIP_BATCH_BY_TRANSACTION_ID_REQUEST = 208,
    GOSSIP_BATCH_RESPONSE = 209,
    GOSSIP_GET_PEERS_REQUEST = 210,
    GOSSIP_GET_PEERS_RESPONSE = 211,
    GOSSIP_CONSENSUS_MESSAGE = 212,
    NETWORK_ACK = 300,
    NETWORK_CONNECT = 301,
    NETWORK_DISCONNECT = 302,
    AUTHORIZATION_CONNECTION_RESPONSE = 600,
    AUTHORIZATION_VIOLATION = 601,
    AUTHORIZATION_TRUST_REQUEST = 602,
    AUTHORIZATION_TRUST_RESPONSE = 603,
    AUTHORIZATION_CHALLENGE_REQUEST = 604,
    AUTHORIZATION_CHALLENGE_RESPONSE = 605,
    AUTHORIZATION_CHALLENGE_SUBMIT = 606,
    AUTHORIZATION_CHALLENGE_RESULT = 607,
    PING_REQUEST = 700,
    PING_RESPONSE = 701,
    CONSENSUS_REGISTER_REQUEST = 800,
    CONSENSUS_REGISTER_RESPONSE = 801,
    CONSENSUS_SEND_TO_REQUEST = 802,
    CONSENSUS_SEND_TO_RESPONSE = 803,
    CONSENSUS_BROADCAST_REQUEST = 804,
    CONSENSUS_BROADCAST_RESPONSE = 805,
    CONSENSUS_INITIALIZE_BLOCK_REQUEST = 806,
    CONSENSUS_INITIALIZE_BLOCK_RESPONSE = 807,
    CONSENSUS_FINALIZE_BLOCK_REQUEST = 808,
    CONSENSUS_FINALIZE_BLOCK_RESPONSE = 809,
    CONSENSUS_SUMMARIZE_BLOCK_REQUEST = 828,
    CONSENSUS_SUMMARIZE_BLOCK_RESPONSE = 829,
    CONSENSUS_CANCEL_BLOCK_REQUEST = 810,
    CONSENSUS_CANCEL_BLOCK_RESPONSE = 811,
    CONSENSUS_CHECK_BLOCKS_REQUEST = 812,
    CONSENSUS_CHECK_BLOCKS_RESPONSE = 813,
    CONSENSUS_COMMIT_BLOCK_REQUEST = 814,
    CONSENSUS_COMMIT_BLOCK_RESPONSE = 815,
    CONSENSUS_IGNORE_BLOCK_REQUEST = 816,
    CONSENSUS_IGNORE_BLOCK_RESPONSE = 817,
    CONSENSUS_FAIL_BLOCK_REQUEST = 818,
    CONSENSUS_FAIL_BLOCK_RESPONSE = 819,
    CONSENSUS_SETTINGS_GET_REQUEST = 820,
    CONSENSUS_SETTINGS_GET_RESPONSE = 821,
    CONSENSUS_STATE_GET_REQUEST = 822,
    CONSENSUS_STATE_GET_RESPONSE = 823,
    CONSENSUS_BLOCKS_GET_REQUEST = 824,
    CONSENSUS_BLOCKS_GET_RESPONSE = 825,
    CONSENSUS_CHAIN_HEAD_GET_REQUEST = 826,
    CONSENSUS_CHAIN_HEAD_GET_RESPONSE = 827,
    CONSENSUS_NOTIFY_PEER_CONNECTED = 900,
    CONSENSUS_NOTIFY_PEER_DISCONNECTED = 901,
    CONSENSUS_NOTIFY_PEER_MESSAGE = 902,
    CONSENSUS_NOTIFY_BLOCK_NEW = 903,
    CONSENSUS_NOTIFY_BLOCK_VALID = 904,
    CONSENSUS_NOTIFY_BLOCK_INVALID = 905,
    CONSENSUS_NOTIFY_BLOCK_COMMIT = 906,
    CONSENSUS_NOTIFY_ACK = 999,
  }
}

