const _ = require('lodash');
import { TransactionManager } from '../transaction_manager';
const chai = require('chai');
// const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
import 'mocha';
import IssuePayload from '../payloads/issue_payload';
import TransactionManagerOptions from '../transaction_manager_options';

chai.use(chaiAsPromised);

const expect = chai.expect;
// const should = chai.should;
// const assert = chai.assert;

describe('Transaction Manager tests', async () => {

  before(async () => {    

  });

  const tmOptions: TransactionManagerOptions = new TransactionManagerOptions('pending-earnings', '1.0', 'earnings', '127.0.0.1', 8008, false);
  const privateKey: string = '442bc950759a2f3e8ecc56e6523b00ae3cf658341f64f894a457543c98f9e313';
  const publicKey: string = '0222dcf75a5b6ab8fc898f36d3ad94c5f423bc80efecad86068ab86d7c06e4a152';

  it('Succesfully construction of TransactionManager class', async() => {
    const tm: TransactionManager = new TransactionManager(privateKey, tmOptions);
    const pk: string = tm.getPrivateKey();
    const pubk: string = tm.getPublicKey();
    expect(pk).to.be.equal(privateKey);
    expect(pubk).to.be.equal(publicKey);
  });

  it('Succesfully calculate a state address', async() => {
    const pk: string = privateKey;    
    const ts: number = 1540804655983;
    const wallet: string = '0x42EB768f2244C8811C63729A21A3569731535f06';
    const amount: number = 200;
    const expectedAddress: string = 'e0a87c93dc4a512daabf6833087b0ce1102cd095a766ea93d57e930970276ceb82ec25';    
    const tm: TransactionManager = new TransactionManager(pk, tmOptions);
    const issuePayload: IssuePayload = { wallet, amount };
    const address: string = tm.getIssueStateAddress(issuePayload, ts);
    expect(address).to.be.equal(expectedAddress);    
  });

  after(async () => {
    
  });

});
