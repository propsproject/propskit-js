import { createHash } from 'crypto';
import { AddressBuilder } from '../common';
import { Earning } from '../proto/earning_pb';

export const FAMILY_NAME: string = 'pending-earnings';
export const FAMILY_VERSION: string = '1.0';
export const PREFIX_STRINGS = {  
  balance: 'pending-props:earnings:balance',  
  balanceUpdate: 'pending-props:earnings:bal-trx',
  blockIdUpdate: 'pending-props:earnings:lastethbloc',
  pending: 'pending-props:earnings:pending',
  revoked: 'pending-props:earnings:revoked',
  settled: 'pending-props:earnings:settled',
  settlements: 'pending-props:earnings:settlements',
};
const PENDING = createHash('sha512')
  .update(PREFIX_STRINGS.pending)
  .digest('hex')
  .substring(0, 6);

const REVOKED = createHash('sha512')
  .update(PREFIX_STRINGS.revoked)
  .digest('hex')
  .substring(0, 6);

const SETTLED = createHash('sha512')
  .update(PREFIX_STRINGS.settled)
  .digest('hex')
  .substring(0, 6);

const SETTLEMENTS = createHash('sha512')
  .update(PREFIX_STRINGS.settlements)
  .digest('hex')
  .substring(0, 6);

const BALANCE = createHash('sha512')
  .update(PREFIX_STRINGS.balance)
  .digest('hex')
  .substring(0, 6);

const nsPrefixes = () => {
  const pending = (): string => PENDING;
  const revoked = (): string => REVOKED;
  const settled = (): string => SETTLED;
  const settlements = (): string => SETTLEMENTS;
  const balance = (): string => BALANCE;  
  const all = (): ReadonlyArray<string> => [
    PENDING,
    REVOKED,
    SETTLED,
    SETTLEMENTS,
    BALANCE,    
  ];
  return Object.freeze({ pending, revoked, settled, settlements, balance, all });
};

export const NamespacePrefixes = nsPrefixes();

export const earningAddress = (
  recipient: string,
  application: string,
  postfix: string
): string => {
  return AddressBuilder(NamespacePrefixes.pending())
    .addPart(AddressBuilder('').normalizeAddress(application), 0, 4)
    .addPart(AddressBuilder('').normalizeAddress(recipient), 0, 4)
    .addPart(postfix, 0, 56)
    .build();
};

export const getBalanceAddress = (
  recipient: string,
  application: string,
): string => {
  return AddressBuilder(NamespacePrefixes.balance())
    .addPart(application, 0, 10)
    .addPart(recipient, 0, 54)
    .build();
};

export const getEarningAddress = (earning: Earning): string => {
  const rec = earning.getDetails().getUserId();
  const app = earning.getDetails().getApplicationId();

  const postfix = `${app}${rec}${earning.getSignature()}`;
  return earningAddress(rec, app, postfix);
};

export const settlementAddress = (ethereumTxtHash: string): string => {
  return AddressBuilder(NamespacePrefixes.settlements())
    .addPart(AddressBuilder('').normalizeAddress(ethereumTxtHash), 0, 64)
    .build();
};
