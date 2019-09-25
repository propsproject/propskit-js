import { TransactionManager, SubmitAPIResponse, BatchDetailsTransaction, WalletBalance, AppUserBalance } from './transaction_manager';
import { BalanceDetails } from './proto/balance_pb';
import { Method } from './proto/payload_pb';
import TransactionPayload from './payloads/transaction_payload';
import ActivityPayload from './payloads/activity_payload';
import WalletLinkPayload from './payloads/wallet_link_payload';

import * as propsclient from './client';
import * as utils from './common';

namespace Props {
  export class Subscriber extends propsclient.Subscriber {};
  export class Config extends propsclient.Config {};
  export class Signer extends utils.Secp256k1Signer {};
  export const AddressBuilder = utils.AddressBuilder;
}

export {
  TransactionManager,
  TransactionPayload,
  SubmitAPIResponse,
  BatchDetailsTransaction,
  WalletBalance,
  AppUserBalance,
  ActivityPayload,
  BalanceDetails,
  Props,
  Method,
  WalletLinkPayload,
};
