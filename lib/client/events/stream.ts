import _ from 'lodash';
import {Logger} from '../../log/logger';
import {ClientEventsSubscribeRequest, ClientEventsUnsubscribeRequest} from '../../sawtooth-sdk-ts/client_event_pb';
import {EventList} from '../../sawtooth-sdk-ts/events_pb';
import {Message} from '../../sawtooth-sdk-ts/validator_pb';
import {Socket} from './socket';

export type StreamMessageHandle = (eventList : any) => void;

export class Stream {
  // tslint:disable-next-line:readonly-keyword
  public socket : Socket;

  constructor(public validator : string, public onConnectHandle : any, public onDisconnectHandle : any, public handle : StreamMessageHandle) {
    this.socket = new Socket(validator, this.onConnectHandle.bind(this), this.onDisconnectHandle.bind(this), this.handleEvent.bind(this));
  }

  public handleEvent(message : Message) : void {
    if(message.getMessageType() === Message.MessageType.CLIENT_EVENTS) {
      const events : EventList = EventList.deserializeBinary(message.getContent_asU8());
      this.handle(events);
    } else {
      if (message.getMessageType() === Message.MessageType.CLIENT_EVENTS_SUBSCRIBE_RESPONSE) {
        Logger.instance().info(`Connected as a subscriber to ${this.validator} with message ${message.getContent()}`)
      } else {
        Logger.instance().warn(`Received message of unknown type: ${message.getMessageType()} with message ${message.getContent()}`)
      }
    }
  }

  public onSocketDisconnect() : void {
    Logger.instance().info('disconnected, will try to reconnect')
    this.socket.close();

    this
      .socket
      .connect();
  }

  public onSocketMessage(message : Message) : void {
    if(message.getMessageType() === Message.MessageType.CLIENT_EVENTS) {
      Logger.instance().info(`received new socket message ${message.toString()}`);
      const events : EventList = EventList.deserializeBinary(message.getContent_asU8());
      this.handle(events);
    } else {
      if (message.getMessageType() === Message.MessageType.CLIENT_EVENTS_SUBSCRIBE_RESPONSE) {
        Logger.instance().info(`Subscribed to the validator on ${this.validator}`);
      } else {
        Logger.instance().warn(`Received message of unknown type: ${message.getMessageType()}`);
      }
    }
  }

  // tslint:disable-next-line:readonly-array
  public submitSubscriptions(subscriptions : ClientEventsSubscribeRequest[]) : void {
    subscriptions.forEach(this.subscribe);
  }

  public subscribe(subscription : ClientEventsSubscribeRequest) : Stream {
    this
      .socket
      .send(Message.MessageType.CLIENT_EVENTS_SUBSCRIBE_REQUEST, subscription.serializeBinary());
    return this;
  }

  public unsubscribe() : void {
    this
      .socket
      .send(Message.MessageType.CLIENT_EVENTS_UNSUBSCRIBE_REQUEST, new ClientEventsUnsubscribeRequest().serializeBinary());

    this
      .socket
      .close();
  }

  public start() : void {
    this
      .socket
      .connect();
  }
};
