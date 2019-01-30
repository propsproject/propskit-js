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
    https: false,
    host: '127.0.0.1',
    port: 8008,
  };

  const privateKey: string = '196749ed808372060eaeffe10e56de82a48829fcf52199847e1e1db4b780ced0'; // '442bc950759a2f3e8ecc56e6523b00ae3cf658341f64f894a457543c98f9e313';
  const publicKey: string = '02753285cc10052e2b64964bb3595120dd86e9c099873864b3bc387e263b6252f7'; // '0222dcf75a5b6ab8fc898f36d3ad94c5f423bc80efecad86068ab86d7c06e4a152';

  it('Succesfully construction of TransactionManager class', async() => {
    const pubk: string = TransactionManager.getPublicKey(privateKey);
    expect(pubk).to.be.equal(publicKey);
  });

  it('Succesfully calculate a pending state address', async() => {
    const pk: string = privateKey;
    const ts: number = 1545751245610;
    const wallet: string = '0x42EB768f2244C8811C63729A21A3569731535f06';
    const amount: number = 200;
    const expectedAddress: string = 'a7db46588e3bbd1ab91e8b271c565d6749903508f298354b1551ae2171b6491267c33a';    
    const tm: TransactionManager = new TransactionManager(options);
    const issuePayload: IssuePayload = { wallet, amount };
    const address: string = tm.getIssueStateAddress(pk, issuePayload, ts);
    expect(address).to.be.equal(expectedAddress);    
  });

  it('Succesfully calculate a balance address', async() => {
    const pk: string = privateKey;    
    const wallet: string = '0x42EB768f2244C8811C63729A21A3569731535f06';    
    const expectedAddress: string = 'ec00a6588e1de8a519664a3218c1e7c0ea8607f85861aaa49b80affa8e93552c5c2a91';    
    const tm: TransactionManager = new TransactionManager(options);
    const address: string = tm.getBalanceStateAddress(wallet);
    expect(address).to.be.equal(expectedAddress);    
  });

  it('Succesfully calculate a balance timestamp address prefix', async() => {
    const pk: string = privateKey;    
    const wallet: string = '0x42EB768f2244C8811C63729A21A3569731535f06';    
    const expectedAddress: string = '32f2ac588e1de8a519664a3218c1e7c0ea8607f85861aaa49b80affa8e93';    
    const tm: TransactionManager = new TransactionManager(options);
    const address: string = tm.getBalanceTimestateAddressPrefix(wallet);
    expect(address).to.be.equal(expectedAddress);    
  });

  after(async () => {
    
  });

});
