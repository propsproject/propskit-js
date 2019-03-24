const _ = require('lodash');
import { TransactionManager } from '../transaction_manager';
const chai = require('chai');
// const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
import 'mocha';
import IssuePayload from '../payloads/issue_payload';

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
    port: 8008,
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

  it('Succesfully calculate a pending state address', async() => {
    const pk: string = 'fd899d64b5209b53e6b6380dbe195500d988b2184d3a7076681370d5d1c58408';
    const ts: number = 1553425328;
    // const wallet: string = '0x1874ce7662ff1f64fd1375861aa9c5661790fd25';
    const userId: string = 'user1';
    const applicationId: string = 'app1';
    const amount: number = 10.5;
    const expectedAddress: string = 'a7db46458f9ec6764d743faabe21429755b354e18e365b6d79ada85d89a58e6e2eaba4';    
    const tm: TransactionManager = new TransactionManager(options);
    const issuePayload: IssuePayload = { userId, applicationId, amount, description: 'Broadcasting' };
    const address: string = tm.getIssueStateAddress(pk, issuePayload, ts);
    expect(address).to.be.equal(expectedAddress);    
  });

  it('Succesfully calculate a balance address', async() => {    
    const userId: string = 'user1';
    const applicationId: string = 'app1';
    const expectedAddress: string = 'ec00a6458f3b51129ec62c20118ff506dac139ec30a521d12b9883e55da92b7d9adeef';    
    const tm: TransactionManager = new TransactionManager(options);
    const address: string = tm.getBalanceStateAddress(applicationId, userId);
    expect(address).to.be.equal(expectedAddress);    
  });

  it('Succesfully calculate an external balance update address', async() => {
    const pk: string = privateKey;    
    const walletAddress: string = '0x2d4dcf292bc5bd8d7246099052dfc76b3cdd3524';
    const txHash: string = '0x0d4d80b54378376131e1ec60ee804fa58f0c33151cd340c8a971cca0a4033834';
    const expectedAddress: string = '383dea0d48cbfe8b2c3253018ba70a80dc38029d1009146791f84fdf6953b3eda14f99';    
    const tm: TransactionManager = new TransactionManager(options);
    const address: string = tm.getBalanceUpdateAddress(txHash, walletAddress);
    expect(address).to.be.equal(expectedAddress);    
  });

  after(async () => {
    
  });

});
