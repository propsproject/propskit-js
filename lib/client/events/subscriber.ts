// tslint:disable:readonly-keyword member-access array-type readonly-array no-object-mutation
import { ClientEventsSubscribeRequest } from '../../sawtooth-sdk-ts/client_event_pb';
import { EventFilter, EventList, EventSubscription } from '../../sawtooth-sdk-ts/events_pb';
import { decodeBalanceEvent, decodeBlockCommit, decodeTransactionEvent, decodeWalletLinkedEvent } from './serializers';
import { Stream } from './stream';

export type EventHandle = (e : any) => void;
export type ErrCallback = (e : Error) => void;

export const EventTypes = {
  balance: 'pending-props:balance',
  blockCommit: 'sawtooth/block-commit',
  transaction: 'pending-props:transaction',
  stateDelta: 'sawtooth/state-delta',
  walletLinked: 'pending-props:walletl',
  walletUnlinked: 'pending-props:walletl',
};

/**
 * Subscribe to blockchain events
 *
 *  * ### Example (es imports)
 * ```js
 *  import { propsclient } from 'lib-props-js'
 *  const subscriber = new propsclient.Subscriber('tcp://localhost:4004');
 *  const onEvent = (e) => {
 *       console.log(e);
 *   };
 *
 *   const onError = (err) => {
 *     console.error(err);
 *   };
 *
 *   const onConnect = (subscriber) => {
 *       subscriber.subscribeAllTransactions();
 *       subscriber.subscribeBlocks();
 *   }
 *
 *   const subscriber = new props.Subscriber('tcp://localhost:4004', onConnect, onEvent, onError);
 *   subscriber.start()
 * ```
 *
 */
export class Subscriber {
  subscriptions : Array < EventSubscription > = [];
  deltas = {};
  decoders : any = {};
  stream : Stream;

  /**
   *  Creates an instance of Subscriber.
   * @param {string} validator endpoint to a validator node
   * @memberof Subscriber
   */
  constructor(public readonly validator : string, public onConnectHandle : any, public onDisconnectHandle : any, public onError : any) {
    this.decoders[EventTypes.transaction] = decodeTransactionEvent;
    this.decoders[EventTypes.blockCommit] = decodeBlockCommit;
    this.decoders[EventTypes.balance] = decodeBalanceEvent;
    this.decoders[EventTypes.walletLinked] = decodeWalletLinkedEvent;
    this.stream = new Stream(validator, () => this.onConnectHandle(this), () => this.onDisconnectHandle(this), this.processEvtList.bind(this));
  }

  /**
   *  Get a new subscription
   *
   * @param {EventFilter} filter event filter for the subscription
   * @param {string} eventType event type to subscribe to
   * @returns {EventSubscription}
   */
  public getSubscription(filter : EventFilter, eventType : string) : EventSubscription {
    const subscription: EventSubscription = new EventSubscription();
    subscription.setFiltersList([filter]);
    subscription.setEventType(eventType);
    return subscription;
  };

  /**
   * Get a new event filter
   *
   * @param {EventFilter.FilterType} filterType
   * @param {string} key the attribute property that will be filtered on
   * @param {string} value regex string for matching
   * @returns {EventFilter}
   */
  public getFilter(filterType : EventFilter.FilterType, key : string, value : string) : EventFilter {
    const filter: EventFilter = new EventFilter();
    filter.setFilterType(filterType);
    filter.setMatchString(value);
    filter.setKey(key);
    return filter;
  };

  /**
   * Process an {EventList} decoding each {EarningEvent} and invoking the callback on each
   *
   * @param {EventList} events event list object that will have each event decoded
   */
  public processEvtList(events : EventList) : void {
    events.getEventsList().reduce((prev, curr) => {
      try {
        const event = this.decoders[curr.getEventType()](curr);
        prev.push({
          event,
          event_type: curr.getEventType(),
        });
        return prev;
      } catch (error) {
        this.onError(error);
        return prev;
      }
    },
      []).forEach((e) => {
        this.deltas[e.event_type](e);
      });
  }

  public start() : void {
    this.stream.start();
  }

  public addSubscription(subscription : EventSubscription) : Subscriber {
    this
      .subscriptions
      .push(subscription);
    return this;
  }

  public subscribeBlocks(callback : any) : Subscriber {
    const subscription: EventSubscription = new EventSubscription();
    subscription.setEventType(EventTypes.blockCommit);
    this.deltas[subscription.getEventType()] = callback;
    return this
      .addSubscription(subscription)
      .sendSubscribeRequest();
  }

  get currentSubscriptions() : ReadonlyArray<EventSubscription> {
    return this.subscriptions;
  }

  public clearSubscriptions() : Subscriber {
    this.subscriptions = [];
    return this;
  }

  /**
   *  Subscribe to any transaction events for the specified recipient
   *
   * @param {string} filterAttr event attribute to filter on
   * @param {string} filterValue value that will be used during the regex
   * @param {string[]} [lastKnownBlockIDs last know block IDS let you catch up where left off
   * @memberof Subscriber
   */
  public subscribeTransactionsWithFilter(filterAttr : string, filterValue : string, callback : any, lastKnownBlockIDs?: string[]) : Subscriber {
    const filter: EventFilter = this.getFilter(EventFilter.FilterType.REGEX_ANY, filterAttr, filterValue);
    const subscription: EventSubscription = this.getSubscription(filter, EventTypes.transaction);
    this.deltas[subscription.getEventType()] = callback;

    return this
      .addSubscription(subscription)
      .sendSubscribeRequest(lastKnownBlockIDs);
  }

  /**
   *
   * @param {TransactionEventHandle} callback function invoked whenever a new transaction event(s) are received from the [Stream]
   * @param {ErrCallback} errCallBack function to handle any errors thrown
   * @param {string} [eventType='*']
   * @param {string[]} [lastKnownBlockIDs last know block IDS let you catch up where left off
   * @memberof Subscriber
   */
  public subscribeAllTransactions(callback : any, lastKnownBlockIDs?: string[]) : Subscriber {
    const filter: EventFilter = this.getFilter(EventFilter.FilterType.REGEX_ANY, 'event_type', '^.*');
    const subscription: EventSubscription = this.getSubscription(filter, EventTypes.transaction);
    this.deltas[subscription.getEventType()] = callback;

    return this
      .addSubscription(subscription)
      .sendSubscribeRequest(lastKnownBlockIDs);
  }

  public subscribeBalance(callback : any, lastKnownBlockIDs?: string[]) : Subscriber {
    const filter: EventFilter = this.getFilter(EventFilter.FilterType.REGEX_ANY, 'event_type', '^.*');
    const subscription: EventSubscription = this.getSubscription(filter, EventTypes.balance);
    this.deltas[subscription.getEventType()] = callback;

    return this
      .addSubscription(subscription)
      .sendSubscribeRequest(lastKnownBlockIDs);
  }

  public subscribeWalletLinked(callback: any, lastKnownBlockIDs?: string[]) {
    const filter: EventFilter = this.getFilter(EventFilter.FilterType.REGEX_ANY, 'event_type', '^.*');
    const subscription: EventSubscription = this.getSubscription(filter, EventTypes.walletLinked);
    this.deltas[subscription.getEventType()] = callback;

    return this
      .addSubscription(subscription)
      .sendSubscribeRequest(lastKnownBlockIDs);
  }

  public subscribeWalletUnlinked(callback: any, lastKnownBlockIDs?: string[]) {
    const filter: EventFilter = this.getFilter(EventFilter.FilterType.REGEX_ANY, 'event_type', '^.*');
    const subscription: EventSubscription = this.getSubscription(filter, EventTypes.walletLinked);
    this.deltas[subscription.getEventType()] = callback;

    return this
      .addSubscription(subscription)
      .sendSubscribeRequest(lastKnownBlockIDs);
  }

  public sendSubscribeRequest(lastKnownBlockIDs?: string[]) : Subscriber {
    const request: ClientEventsSubscribeRequest = new ClientEventsSubscribeRequest();
    request.setSubscriptionsList(this.subscriptions);

    if (lastKnownBlockIDs) {
      request.setLastKnownBlockIdsList(lastKnownBlockIDs);
    }
    this
        .stream
        .subscribe(request);
    return this;
  }
}
