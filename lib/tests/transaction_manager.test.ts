const _ = require('lodash');
import { TransactionManager } from '../transaction_manager';
const chai = require('chai');
// const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
import 'mocha';
import TransactionPayload from '../payloads/transaction_payload';
import { Method } from '../proto/payload_pb';

chai.use(chaiAsPromised);

const expect = chai.expect;
// const should = chai.should;
// const assert = chai.assert;

describe('Transaction Manager tests', async () => {

  before(async () => {

  });

  const options = {
    familyName: 'pending-earnings',
    familyVersion: '1.0',
    host: '127.0.0.1',
    // host: 'api.propschain.propsproject.io', // '127.0.0.1',
    // port: 443,
    https: false,
  };

  const privateKey: string = '196749ed808372060eaeffe10e56de82a48829fcf52199847e1e1db4b780ced0'; // '442bc950759a2f3e8ecc56e6523b00ae3cf658341f64f894a457543c98f9e313';
  const publicKey: string = '02753285cc10052e2b64964bb3595120dd86e9c099873864b3bc387e263b6252f7'; // '0222dcf75a5b6ab8fc898f36d3ad94c5f423bc80efecad86068ab86d7c06e4a152';

  it('Succesfully construction of TransactionManager class', async() => {
    const pubk: string = TransactionManager.getPublicKey(privateKey);
    expect(pubk).to.be.equal(publicKey);
  });

  // it('Temp test issue using library', async() => {
  //   const pk: string = 'fd899d64b5209b53e6b6380dbe195500d988b2184d3a7076681370d5d1c58408';
  //   const ts: number = 1553435328;
  //   // const wallet: string = '0x1874ce7662ff1f64fd1375861aa9c5661790fd25';
  //   const userId: string = 'user1';
  //   const applicationId: string = 'app1';
  //   const amount: number = 19.5;
  //   const tm: TransactionManager = new TransactionManager(options);
  //   const issuePayload: IssuePayload = { userId, applicationId, amount, description: 'Broadcasting' };
  //   const res = await tm.submitIssueTransaction(pk, [issuePayload], ts);
  //   console.log(`res=${res}`);
  // });

  // it('Succesfully calculate a pending state address', async() => {
  //   const pk: string = 'fd899d64b5209b53e6b6380dbe195500d988b2184d3a7076681370d5d1c58408';
  //   const ts: number = 1559486262;
  //   // const wallet: string = '0x1874ce7662ff1f64fd1375861aa9c5661790fd25';
  //   const userId: string = 'user1';
  //   const applicationId: string = 'app1';
  //   const amount: number = 25;
  //   const expectedAddress: string = 'bd88c631458f3b51129ec62c20118ff506dac139ec30a521d12b9883e55de4ad3682c1';
  //   const tm: TransactionManager = new TransactionManager(options);
    
  //   await tm.submitLinkWalletTransaction(pk, {
  //     userId: '6c743be532b64f1b0988ea900de30313',
  //     applicationId: '0x027cb938611e48772af147d3cc89542d6c197fe9',
  //     address: '0x14639a2403467a8af99fdb2e8b142f4d1a8fa4e0',
  //     signature: '0xab9dbdf277cab66c6eadcad6d23e8ec31b4b4154017bfe3b748c0319e84c30d45f9f92b8a8d461491325f57ef4f11f552358c391d5787c1242bbf44438b047781c',
  //   });
  //   // const transactionPayload: TransactionPayload = { transactionType: Method.ISSUE, userId, applicationId, amount, description: 'Broadcasting' };
  //   const address: string = tm.getTransactionStateAddress(Method.ISSUE, applicationId, userId, ts);
  //   expect(address).to.be.equal(expectedAddress);
  // });

  it('Succesfully calculate a balance address', async() => {
    const userId: string = 'user1';
    const applicationId: string = 'app1';
    const expectedAddress: string = 'ec00a6458f3b51129ec62c20118ff506dac139ec30a521d12b9883e55da92b7d9adeef';
    const tm: TransactionManager = new TransactionManager(options);
    const address: string = tm.getBalanceStateAddress(applicationId, userId);
    expect(address).to.be.equal(expectedAddress);
  });

  it('Succesfully calculate an external balance update address', async() => {
    const walletAddress: string = '0x2d4dcf292bc5bd8d7246099052dfc76b3cdd3524';
    const txHash: string = '0x0d4d80b54378376131e1ec60ee804fa58f0c33151cd340c8a971cca0a4033834';
    const expectedAddress: string = '383dea0d48cbfe8b2c3253018ba70a80dc38029d1009146791f84fdf6953b3eda14f99';
    const tm: TransactionManager = new TransactionManager(options);
    const address: string = tm.getBalanceUpdateAddress(txHash, walletAddress);
    expect(address).to.be.equal(expectedAddress);
  });

  // it('Calculate an activity state address', async() => {
  //   const appId = '0x2d4dcf292bc5bd8d7246099052dfc76b3cdd3524';
  //   const userId = '100';
  //   const date = 20190610;
  //   const expectedAddress = '2ddf6c604b2e5d6791f84fdf643c30f73a3017050b287794fc8c5bb9ab06b9ce38a1fc';
  //   const tm: TransactionManager = new TransactionManager(options);
  //   const address: string = tm.getActivityLogAddress(date, userId, appId);
  //   expect(address).to.be.equal(expectedAddress);
  // });

  after(async () => {

  });

});
