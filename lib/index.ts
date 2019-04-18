import { TransactionManager, SubmitAPIResponse, BatchDetailsTransaction, WalletBalance } from './transaction_manager';
import IssuePayload from './payloads/issue_payload';
import SettlePayload from './payloads/settle_payload';

import * as propsclient from './client';
import * as utils from './common';
import * as pendingprops from './pending-props';

import * as Earnings_pb from './proto/earning_pb';
import * as Events_pb from './proto/events_pb';
import * as Payload_pb from './proto/payload_pb';

class Props {
  static Subscriber = propsclient.Subscriber;
  static Config = propsclient.Config;
  static Client = propsclient.Client;
  static Signer = utils.Secp256k1Signer;
  static AddressBuilder = utils.AddressBuilder;
  static Earnings = pendingprops;
  static Protos = {
    Earnings_pb,
    Events_pb,
    Payload_pb,
  };

}

export {
  TransactionManager,
  IssuePayload,
  SettlePayload,
  SubmitAPIResponse,
  BatchDetailsTransaction,
  WalletBalance,
  Props,
};
