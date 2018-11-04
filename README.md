# lib-pending-props

Submit issue and revoke transactions to sawtooth pending-props blockchain

## Submitting a trasnaction

The following will submit an issue transaction to the blockachain

```javascript
import { TransactionManager, TransactionManagerOptions, IssuePayload, SubmitAPIResponse } from '@younow/lib-pending-props';
const tmOptions: TransactionManagerOptions = new TransactionManagerOptions('pending-earnings', '1.0', 'earnings', '127.0.0.1', 8008, false);
const privateKey: string = '442bc950759a2f3e8ecc56e6523b00ae3cf658341f64f894a457543c98f9e313';
const tm: TransactionManager = new TransactionManager(privateKey, tmOptions);
const payload: IssuePayload = { wallet: '0xC2D7CF95645D33006175B78989035C7c9061d3F9', amount: 100 };
const res: boolean = await tm.submitIssueTransaction([payload], Date.now());
const lastResponse: SubmitAPIResponse = tm.getSubmitResponse();

```

The following will submit a revoke transaction to the blockachain

```javascript
import { TransactionManager, TransactionManagerOptions, SubmitAPIResponse } from '@younow/lib-pending-props';
const tmOptions: TransactionManagerOptions = new TransactionManagerOptions('pending-earnings', '1.0', 'earnings', '127.0.0.1', 8008, false);
const privateKey: string = '442bc950759a2f3e8ecc56e6523b00ae3cf658341f64f894a457543c98f9e313';
const stateAddress: string = 'e0a87c93dc4a51241027f055bc7fc6463cfd2ff3505534a789c6fab5aac6235762d1d7';
const tm: TransactionManager = new TransactionManager(privateKey, tmOptions);
const res: boolean = await tm.submitRevokeTransaction([stateAddress]);
const lastResponse: SubmitAPIResponse = tm.getSubmitResponse();

```

## Getting Info about a state address

The following will get earnings info from the state address

```javascript
import { TransactionManager, TransactionManagerOptions, SubmitAPIResponse } from '@younow/lib-pending-props';
const tmOptions: TransactionManagerOptions = new TransactionManagerOptions('pending-earnings', '1.0', 'earnings', '127.0.0.1', 8008, false);
const privateKey: string = '442bc950759a2f3e8ecc56e6523b00ae3cf658341f64f894a457543c98f9e313';
const stateAddress: string = 'e0a87c93dc4a51241027f055bc7fc6463cfd2ff3505534a789c6fab5aac6235762d1d7';
const tm: TransactionManager = new TransactionManager(privateKey, tmOptions);
const res = await tm.addressLookup([tateAddress);
console.log(JSON.stringify(res));

```
