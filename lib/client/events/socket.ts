import { createHash } from 'crypto';
import uuid from 'uuid/v4';
import * as zmq from 'zeromq';
import { Logger } from '../../log/logger';
import { Message } from '../../sawtooth-sdk-ts/validator_pb';

export class Socket {
  // tslint:disable-next-line:readonly-keyword
  public isConnected : boolean = false;
  // tslint:disable-next-line:readonly-keyword
  public socket = zmq.socket('dealer');

  constructor(public validator : string, public onConnectHandle : any, public onDisconnectHandle : any, public onMessageHandle : any) {
    this.setupSocket();
  }

  public setupSocket() : void {
    // tslint:disable-next-line:no-object-mutation
    this.socket.identity = Buffer.from(uuid(), 'utf8');

    Logger.instance().info(`Setting up the socket to ${this.validator}`);

    this
      .socket
      .on('connect', this.onConnect.bind(this));

    this
      .socket
      .on('disconnect', this.onDisconnect.bind(this));

    this
      .socket
      .on('message', this.onMessage.bind(this));

    this
      .socket
      .on('close', this.onClose.bind(this));

    this
      .socket
      .on('bind_error', this.onBindError.bind(this));

    this
      .socket
      .on('connect_retry', this.onConnectRetry.bind(this));

    this.socket.on('connect_delay', this.onConnectDelay.bind(this));
    this.socket.on('accept_error', this.onAcceptError.bind(this));
    this.socket.on('close_error', this.onCloseError.bind(this));
  }

  public onAcceptError() : void {
    Logger.instance().info('on accept error');
  }

  public onCloseError() : void {
    Logger.instance().info('on close error');
  }

  public onConnectDelay() : void {
    Logger.instance().info('on connect delay');
  }

  public onClose() : void {
    Logger.instance().info(`Closed connection to ${this.validator}`);
  }

  public onBindError() : void {
    Logger.instance().info('bind error');
  }

  public onConnectRetry() : void {
    Logger.instance().info('onConnect retry');
  }

  public onMessage(buffer): void {
    const message = Message.deserializeBinary(Buffer.from(buffer));
    this.onMessageHandle(message);
  }

  public onConnect() : void {
    Logger.instance().info(`Connected to ${this.validator}`);
    // tslint:disable-next-line:no-object-mutation
    this.isConnected = true;
    this.onConnectHandle();
  }

  public onDisconnect() : void {
    Logger.instance().info(`Disconnected from ${this.validator}`);
    // tslint:disable-next-line:no-object-mutation
    this.isConnected = false;
    this.onDisconnectHandle();

    // this.setupSocket();
  }

  public encodeMessage(messageType : Message.MessageType, correlationId : string, content : Uint8Array) : Message {
    try {
      const message : Message = new Message();
      message.setMessageType(messageType);
      message.setCorrelationId(correlationId);
      message.setContent(content);
      return message;
    } catch (error) {
      throw error;
    }
  }

  public generateId() : string {
    return createHash('sha256')
      .update(uuid())
      .digest('hex');
  }

  public connect(): void {

    Logger.instance().info(`Trying to connect to ${this.validator}`);

    this
      .socket
      .monitor(250, 0);

    this
      .socket
      .connect(this.validator);
  }

  public close() : void {
    this
      .socket
      .setsocketopt(zmq.options.linger, 0);
    this
      .socket
      .setsocketopt(zmq.options.linger, 0);
    this
      .socket
      .close();
  }

  public sendBack(messageType : Message.MessageType, correlationId : string, content : Uint8Array) : void {
    if (this.isConnected) {
      const message : Message = this.encodeMessage(messageType, correlationId, content);
      this
        .socket
        .send(Buffer.from(message.serializeBinary()));
    }
  }

  public send(messageType : Message.MessageType, content : Uint8Array) : void {
    if (this.isConnected) {
      const correlationId : string = this.generateId();
      try {
        const msg : Message = this.encodeMessage(messageType, correlationId, content);
        this
          .socket
          .send(Buffer.from(msg.serializeBinary()));
      } catch (error) {
        throw error;
      }
    } else {
      if (this.isConnected === false) {
        Logger.instance().error(`Must call \`connect\` before calling \`send\``);
        throw new Error('Must call `connect` before calling `send`');
      } else {
        Logger.instance().error(`The connect to the validator was lost: ${this.validator}`);
        throw new Error('The connection to the validator was lost');
      }
    }
  }
};
