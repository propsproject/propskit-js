const fs = require('fs');
import { TransactionManager, AppUserBalance, WalletBalance } from '../transaction_manager';
import IssuePayload from '../payloads/issue_payload';
const { exec } = require('child_process');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const waitUntil = require('async-wait-until');
chai.use(chaiAsPromised);
const expect = chai.expect;
const BigNumber = require('bignumber.js');
BigNumber.config({ EXPONENTIAL_AT: 1e+9 });
import * as mocha from 'mocha';

let startTime = Math.floor(Date.now() / 1000);
const amounts = [125, 50.5];
const descriptions = ['Broadcasting', 'Watching'];
const waitTimeUntilOnChain = 750; // miliseconds
const longerTestWaitMultiplier = 5;

// data about the ethereum transactions we're testing with
const walletAddress =  '0x2d4dcf292bc5bd8d7246099052dfc76b3cdd3524';
const pk = '759b603832da1100ab47c0f4aa6d445637eb5873d25cadd40484c48970b814d7';
const pkSawtooth: string = 'fd899d64b5209b53e6b6380dbe195500d988b2184d3a7076681370d5d1c58408';
const balanceAtBlock = '428521654000000000000000';
const txHash = '0x0d4d80b54378376131e1ec60ee804fa58f0c33151cd340c8a971cca0a4033834';
const blockNum = 3961643;
const timestamp = 1551553747;

const balanceAtBlock2 = '428513884000000000000000';
const txHash2 = '0x9ef12357191c917cbc3c8102c36948dc731b650852448c51f4705d0f30119100';
const blockNum2 = 3966915;
const timestamp2 = 1551632827;

const lastEthBlockId1 = 3966915;
const lastEthBlockId2 = 3968211;

const options = {
  familyName: 'pending-earnings',
  familyVersion: '1.0',
  host: '127.0.0.1',
  port: 8008,
};

const earningAddresses: string[] = [];
const issueTimestamp: number = Math.floor(Date.now() / 1000);

describe('Transaction Manager interacting with Sawtooth side chain tests', async () => {
  before(async () => {
    console.log(`will wait for sawtooth to be ready...`);
    let REGEX = /Now building on top of block.*/g;
    // const
    await waitUntil(() => {
      console.log(`still waiting ${ Math.floor(Date.now() / 1000) - startTime}...`);
      const fileContents = fs.readFileSync('/tmp/out.log', 'utf8');
      const results = fileContents.match(REGEX);
      if (results != null && results.length > 0) {
        return true;
      } else {
        return false;
      }
    },              90000, 1000);
    // wait 5 mote seconds to make sure everything is ready to go
    // execute tp now that sawtooth is ready
    const workingDir = process.cwd();
    console.log(`will wait for tp to be ready... executing: cd $GOPATH/src/github.com/propsproject/pending-props && go run cmd/main.go -c -f ./configs/development.json  >> /tmp/out.log 2>> /tmp/out.log && cd ${workingDir}`);
    exec(`cd $GOPATH/src/github.com/propsproject/pending-props && go run cmd/main.go -c -f ./configs/development.json  >> /tmp/out.log 2>> /tmp/out.log && cd ${workingDir}`, (err, stdout, stderr) => {
      if (err) {
        console.log(`node couldn't execute the command: ${err}`);
        return;
      }

      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
    // execSync('cd ../ && go run cmd/main.go -c -f ./configs/development.json  >> /tmp/out.log 2>> /tmp/out.log && cd dev-cli');
    REGEX = /registered transaction processor.*pending/g;
    startTime = Math.floor(Date.now() / 1000);
    await waitUntil(() => {
      console.log(`still waiting for tp ${ Math.floor(Date.now() / 1000) - startTime}...`);
      const fileContents = fs.readFileSync('/tmp/out.log', 'utf8');
      const results = fileContents.match(REGEX);
      if (results != null && results.length > 0) {
        return true;
      } else {
        return false;
      }
    },              90000, 1000);
    const timeOfStart = Math.floor(Date.now() / 1000);
    await waitUntil(() => {
      const timePassed =  Math.floor(Date.now() / 1000) - timeOfStart;
      console.log(`waiting for one more second before testing ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
      return (timePassed > 1);
    },              10000, 1000);
  });
/*
  it('Successfully issue an earning', async() => {
    const app = 'app1';
    const user = 'user1';
    const issuePayload: IssuePayload = {
      userId: user,
      applicationId: app,
      amount: amounts[0],
      description: descriptions[0],
    };

    // issue
    const tm:TransactionManager = new TransactionManager(options);
    const res:boolean = await tm.submitIssueTransaction(pkSawtooth, [issuePayload], issueTimestamp);
    expect(res).to.be.equal(true);
    const timeOfStart = Math.floor(Date.now());
    // wait a bit for it to be on chain
    await waitUntil(() => {
      const timePassed =  Math.floor(Date.now()) - timeOfStart;
      //   console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
      return (timePassed > waitTimeUntilOnChain);
    },              10000, 100);
    const earningAddress = tm.getIssueStateAddress(pkSawtooth, issuePayload, issueTimestamp);
    earningAddresses.push(earningAddress);
    const earningOnChain = await tm.addressLookup(earningAddress, 'EARNING');
    // console.log(`earningOnChain=${JSON.stringify(earningOnChain)}`);
    const balanceOnChain: AppUserBalance = await tm.getBalanceByAppUser(app, user);
    // console.log(`balanceOnChain=${JSON.stringify(balanceOnChain)}`);
    const earningPropsAmount = new BigNumber(earningOnChain.amountEarned, 10);
    const balancePendingAmount = new BigNumber(balanceOnChain.pending, 10);
    const balanceTotalPendingAmount = new BigNumber(balanceOnChain.totalPending, 10);
    const balanceTotalAmount = new BigNumber(balanceOnChain.total, 10);

    // expect earning details to be correct
    expect(earningPropsAmount.div(1e18).toString()).to.be.equal(amounts[0].toString());
    expect(earningOnChain.userId).to.be.equal(user);
    expect(earningOnChain.applicationId).to.be.equal(app);
    expect(earningOnChain.description).to.be.equal(descriptions[0]);
    expect(earningOnChain.status).to.be.equal(0);

    // expect balance details to be correct
    expect(balancePendingAmount.div(1e18).toString()).to.be.equal(amounts[0].toString());
    expect(balanceTotalPendingAmount.div(1e18).toString()).to.be.equal(amounts[0].toString());
    expect(balanceTotalAmount.div(1e18).toString()).to.be.equal(amounts[0].toString());
    expect(balanceOnChain.userId).to.be.equal(user);
    expect(balanceOnChain.applicationId).to.be.equal(app);
    expect(balanceOnChain.lastUpdateType).to.be.equal(0);
    expect(balanceOnChain.type).to.be.equal(0);
    expect(balanceOnChain.linkedWallet).to.be.equal('');
  });


  it('Successfully revoke one earning', async() => {
    const app = 'app1';
    const user = 'user1';
    const issuePayload: IssuePayload = {
      userId: user,
      applicationId: app,
      amount: amounts[0],
      description: descriptions[0],
    };
    const tm:TransactionManager = new TransactionManager(options);
    const res:boolean = await tm.submitRevokeTransaction(pkSawtooth, [earningAddresses[0]], app, user);
    expect(res).to.be.equal(true);
    const timeOfStart = Math.floor(Date.now());
    // wait a bit for it to be on chain
    await waitUntil(() => {
      const timePassed =  Math.floor(Date.now()) - timeOfStart;
      //   console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
      return (timePassed > waitTimeUntilOnChain);
    },              10000, 100);
    const earningAddress = tm.getIssueStateAddress(pkSawtooth, issuePayload, issueTimestamp);
    const revokeAddress = tm.issueStateAddressToRevokeStateAddress(earningAddress);
    const earningOnChain = await tm.addressLookup(earningAddress, 'EARNING');
    // console.log(`earningOnChain=${JSON.stringify(earningOnChain)}`);
    const revokeOnChain = await tm.addressLookup(revokeAddress, 'EARNING');
    // console.log(`revokeOnChain=${JSON.stringify(revokeOnChain)}`);
    const balanceOnChain: AppUserBalance = await tm.getBalanceByAppUser(app, user);
    // console.log(`balanceOnChain=${JSON.stringify(balanceOnChain)}`);
    const revokedPropsAmount = new BigNumber(revokeOnChain.amountEarned, 10);
    const balancePendingAmount = new BigNumber(balanceOnChain.pending, 10);
    const balanceTotalPendingAmount = new BigNumber(balanceOnChain.totalPending, 10);
    const balanceTotalAmount = new BigNumber(balanceOnChain.total, 10);

    // expect earning record to be gone
    expect(earningOnChain).to.be.equal(undefined);

    // expect revoke details to be correct
    expect(revokedPropsAmount.div(1e18).toString()).to.be.equal(amounts[0].toString());
    expect(revokeOnChain.userId).to.be.equal(user);
    expect(revokeOnChain.applicationId).to.be.equal(app);
    expect(revokeOnChain.description).to.be.equal(descriptions[0]);
    expect(revokeOnChain.status).to.be.equal(0);

    // expect balance details to be correct
    expect(balancePendingAmount.div(1e18).toString()).to.be.equal('0');
    expect(balanceTotalPendingAmount.div(1e18).toString()).to.be.equal('0');
    expect(balanceTotalAmount.div(1e18).toString()).to.be.equal('0');
    expect(balanceOnChain.userId).to.be.equal(user);
    expect(balanceOnChain.applicationId).to.be.equal(app);
    expect(balanceOnChain.lastUpdateType).to.be.equal(0);
    expect(balanceOnChain.type).to.be.equal(0);
    expect(balanceOnChain.linkedWallet).to.be.equal('');
  });

/*
  it('Successfully update mainchain balance', async() => {
    const tm:TransactionManager = new TransactionManager(options);
    const res:boolean = await tm.submitBalanceUpdateTransaction(pkSawtooth, walletAddress, balanceAtBlock, txHash, blockNum, timestamp);
    expect(res).to.be.equal(true);
    const timeOfStart = Math.floor(Date.now());
    // wait a bit for it to be on chain
    await waitUntil(() => {
      const timePassed =  Math.floor(Date.now()) - timeOfStart;
      //   console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
      return (timePassed > (waitTimeUntilOnChain*longerTestWaitMultiplier));
    },              10000, 100);

    const balanceOnChain:WalletBalance = await tm.getBalanceByWallet(walletAddress);
    // console.log(`balanceOnChain=${JSON.stringify(balanceOnChain)}`);

    // expect balance details to be correct
    expect(balanceOnChain.pending).to.be.equal('0');
    expect(balanceOnChain.totalPending).to.be.equal('0');
    expect(balanceOnChain.transferable).to.be.equal(balanceAtBlock);
    expect(balanceOnChain.total).to.be.equal(balanceAtBlock);
    expect(balanceOnChain.wallet).to.be.equal(walletAddress);
    expect(balanceOnChain.lastUpdateType).to.be.equal(1);
    expect(balanceOnChain.type).to.be.equal(1);
    expect(balanceOnChain.linkedWallet).to.be.equal('');
  });
*/
  it('Successfully link app user to wallet', async() => {
    const app = 'app1';
    const user = 'user1';
    const sig = await TransactionManager.signMessage(`${app}${user}`, walletAddress, pk);
    const tm:TransactionManager = new TransactionManager(options);
    const res: boolean = await tm.submitLinkWalletTransaction(pkSawtooth, walletAddress, app, user, sig);
    expect(res).to.be.equal(true);
    const timeOfStart = Math.floor(Date.now());
    // wait a bit for it to be on chain
    await waitUntil(() => {
      const timePassed =  Math.floor(Date.now()) - timeOfStart;
      //   console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
      return (timePassed > waitTimeUntilOnChain);
    },              10000, 100);

    const balanceOnChain: AppUserBalance = await tm.getBalanceByAppUser(app, user);
    // console.log(`balanceOnChain=${JSON.stringify(balanceOnChain)}`);
    const balancePendingAmount = new BigNumber(balanceOnChain.pending, 10);
    const balanceTotalPendingAmount = new BigNumber(balanceOnChain.totalPending, 10);
    const balanceTotalAmount = balanceOnChain.total;

    // expect for link to be properly on chain
    const walletLinkAddress = tm.getWalletLinkAddress(walletAddress);
    const walletLinkOnChain = await tm.addressLookup(walletLinkAddress, 'WALLETLINK');
    // console.log(`walletLinkOnChain=${JSON.stringify(walletLinkOnChain)}`);
    expect(walletLinkOnChain.address).to.be.equal(walletAddress);
    expect(walletLinkOnChain.usersList.length).to.be.equal(1);
    expect(walletLinkOnChain.usersList[0].applicationId).to.be.equal(app);
    expect(walletLinkOnChain.usersList[0].userId).to.be.equal(user);
    expect(walletLinkOnChain.usersList[0].signature).to.be.equal(sig);

    // expect balance details to be correct
    expect(balancePendingAmount.div(1e18).toString()).to.be.equal('0');
    expect(balanceTotalPendingAmount.div(1e18).toString()).to.be.equal('0');
    expect(balanceOnChain.transferable).to.be.equal(balanceAtBlock);
    expect(balanceTotalAmount).to.be.equal(balanceAtBlock);
    expect(balanceOnChain.linkedWallet).to.be.equal(walletAddress);
  });
/*
  it('Successfully update last eth block Id', async() => {
    const tm:TransactionManager = new TransactionManager(options);
    const res: boolean = await tm.submitNewEthBlockIdTransaction(pkSawtooth, lastEthBlockId1);
    expect(res).to.be.equal(true);
    const timeOfStart = Math.floor(Date.now());
    // wait a bit for it to be on chain
    await waitUntil(() => {
      const timePassed =  Math.floor(Date.now()) - timeOfStart;
      //   console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
      return (timePassed > waitTimeUntilOnChain);
    },              10000, 100);
    const lastEthBlockAddress = tm.getLastEthBlockStateAddress();
    const ethBlockOnChain = await tm.addressLookup(lastEthBlockAddress, 'LASTETHBLOCK');
    // console.log(`ethBlockOnChain=${JSON.stringify(ethBlockOnChain)}`);

    // expect last eth block to be correct
    expect(ethBlockOnChain.id).to.be.equal(lastEthBlockId1);
  });
/*
  it('Successfully submit multiple transactions with batch', async() => {
    const app = 'app1';
    const user = 'user1';
    const issuePayload: IssuePayload = {
      userId: user,
      applicationId: app,
      amount: amounts[0],
      description: descriptions[0],
    };
    const issueTimestamp2 = Math.floor(Date.now() / 1000);
    const tm:TransactionManager = new TransactionManager(options);
    tm.setAccumulateTransactions(true);
    const res1: boolean = await tm.submitIssueTransaction(pkSawtooth, [issuePayload], issueTimestamp2);
    const res2: boolean = await tm.submitNewEthBlockIdTransaction(pkSawtooth, lastEthBlockId2);
    const res3: boolean = await tm.submitBalanceUpdateTransaction(pkSawtooth, walletAddress, balanceAtBlock2, txHash2, blockNum2, timestamp2);
    expect(res1).to.be.equal(true);
    expect(res2).to.be.equal(true);
    expect(res3).to.be.equal(true);
    const res: boolean = await tm.commitTransactions(pkSawtooth);
    expect(res).to.be.equal(true);
    const timeOfStart = Math.floor(Date.now());
    // wait a bit for it to be on chain
    await waitUntil(() => {
      const timePassed =  Math.floor(Date.now()) - timeOfStart;
      //   console.log(`waiting for transaction ${ Math.floor(Date.now()) - timeOfStart}...`);
      return (timePassed > (waitTimeUntilOnChain * longerTestWaitMultiplier));
    },              10000, 100);
    const lastEthBlockAddress = tm.getLastEthBlockStateAddress();
    const ethBlockOnChain = await tm.addressLookup(lastEthBlockAddress, 'LASTETHBLOCK');
    // console.log(`ethBlockOnChain=${JSON.stringify(ethBlockOnChain)}`);
    // expect last eth block to be correct
    expect(ethBlockOnChain.id).to.be.equal(lastEthBlockId2);
    const balanceOnChain:WalletBalance = await tm.getBalanceByWallet(walletAddress);
    // console.log(`balanceOnChain=${JSON.stringify(balanceOnChain)}`);
    const expectedBalanceTotal = new BigNumber(balanceAtBlock2, 10);

    // expect balance details to be correct
    const balanceOnChainTotalPending = new BigNumber(balanceOnChain.totalPending, 10);
    expect(balanceOnChain.pending).to.be.equal('0');
    expect(balanceOnChainTotalPending.div(1e18).toString()).to.be.equal(amounts[0].toString());
    expect(balanceOnChain.transferable).to.be.equal(balanceAtBlock2);
    expect(balanceOnChain.wallet).to.be.equal(walletAddress);
    expect(balanceOnChain.lastUpdateType).to.be.equal(1);
    expect(balanceOnChain.type).to.be.equal(1);
    expect(balanceOnChain.linkedWallet).to.be.equal('');

    const earningAddress = tm.getIssueStateAddress(pkSawtooth, issuePayload, issueTimestamp2);
    const earningOnChain = await tm.addressLookup(earningAddress, 'EARNING');
    // console.log(`earningOnChain=${JSON.stringify(earningOnChain)}`);
    const userBalanceOnChain: AppUserBalance = await tm.getBalanceByAppUser(app, user);
    // console.log(`userBalanceOnChain=${JSON.stringify(userBalanceOnChain)}`);
    const earningPropsAmount = new BigNumber(earningOnChain.amountEarned, 10);
    const balancePendingAmount = new BigNumber(userBalanceOnChain.pending, 10);
    const balanceTotalPendingAmount = new BigNumber(userBalanceOnChain.totalPending, 10);
    const balanceTotalAmount = new BigNumber(userBalanceOnChain.total, 10);

    // expect earning details to be correct
    expect(earningPropsAmount.div(1e18).toString()).to.be.equal(amounts[0].toString());
    expect(earningOnChain.userId).to.be.equal(user);
    expect(earningOnChain.applicationId).to.be.equal(app);
    expect(earningOnChain.description).to.be.equal(descriptions[0]);
    expect(earningOnChain.status).to.be.equal(0);

    // expect balance details to be correct

    expect(balancePendingAmount.div(1e18).toString()).to.be.equal(amounts[0].toString());
    expect(balanceTotalPendingAmount.div(1e18).toString()).to.be.equal(amounts[0].toString());
    expect(balanceTotalAmount.toString()).to.be.equal(earningPropsAmount.plus(expectedBalanceTotal).toString());
    expect(userBalanceOnChain.transferable).to.be.equal(balanceAtBlock2);
    expect(userBalanceOnChain.userId).to.be.equal(user);
    expect(userBalanceOnChain.applicationId).to.be.equal(app);
    expect(userBalanceOnChain.lastUpdateType).to.be.equal(0);
    expect(userBalanceOnChain.type).to.be.equal(0);
    expect(userBalanceOnChain.linkedWallet).to.be.equal(walletAddress);
  });
*/
//   it('Successfully issue an earning to user with linked wallet', async() => {
//     const addresses = {};
//     const app = 'app1';
//     const user = 'user1';
//         // issue
//     await pendingProps.issue(app, user, amounts[0], descriptions[0], addresses);
//     console.log(JSON.stringify(addresses));
//     const timeOfStart = Math.floor(Date.now() / 1000);
//         // wait a bit for it to be on chain
//     await waitUntil(() => {
//       const timePassed =  Math.floor(Date.now() / 1000) - timeOfStart;
//       console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
//       return (timePassed > waitTimeUntilOnChain);
//     },              10000, 1000);
//     const balanceAddress = pendingProps.CONFIG.earnings.namespaces.balanceAddress(app, user);
//     const balanceOnChain = await pendingProps.queryState(balanceAddress, 'balance');
//     console.log(`balanceOnChain=${JSON.stringify(balanceOnChain)}`);
//     earningAddresses.push(addresses['stateAddress']);

//     const balanceObj = balanceOnChain[0];
//     const balanceDetails = balanceObj.balanceDetails;

//     const balancePendingAmount = new BigNumber(balanceDetails.pending, 10);
//     const balanceTotalPendingAmount = new BigNumber(balanceDetails.totalPending, 10);
//     const balanceTotalAmount = new BigNumber(balanceDetails.total, 10);

//     let expectedTotalPendingAmount = new BigNumber(amounts[0], 10);
//     expectedTotalPendingAmount = expectedTotalPendingAmount.times(1e18);
//     let expectedTotalAmount = new BigNumber(balanceAtBlock, 10);
//     expectedTotalAmount = expectedTotalAmount.plus(expectedTotalPendingAmount);

//         // expect balance details to be correct considering the linked wallet
//     expect(balancePendingAmount.div(1e18).toString()).to.be.equal(amounts[0].toString());
//     expect(balanceTotalPendingAmount.div(1e18).toString()).to.be.equal(amounts[0].toString());
//     expect(balanceTotalAmount.toString()).to.be.equal(expectedTotalAmount.toString());
//     expect(balanceObj.userId).to.be.equal(user);
//     expect(balanceObj.applicationId).to.be.equal(app);
//     expect(balanceObj.linkedWallet).to.be.equal(walletAddress);
//   });

//   it('Successfully revoke an earning of a user with a linked wallet', async() => {
//     const revokeAddress = {};
//     const user = 'user1';
//     const app = 'app1';
//     await pendingProps.revoke([earningAddresses[2]], revokeAddress);
//     console.log(JSON.stringify(revokeAddress));
//     const timeOfStart = Math.floor(Date.now() / 1000);
//         // wait a bit for it to be on chain
//     await waitUntil(() => {
//       const timePassed =  Math.floor(Date.now() / 1000) - timeOfStart;
//       console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
//       return (timePassed > waitTimeUntilOnChain);
//     },              10000, 1000);

//     const balanceAddress = pendingProps.CONFIG.earnings.namespaces.balanceAddress(app, user);
//     const balanceOnChain = await pendingProps.queryState(balanceAddress, 'balance');
//     console.log(`balanceOnChain=${JSON.stringify(balanceOnChain)}`);

//     const balanceObj = balanceOnChain[0];
//     const balanceDetails = balanceObj.balanceDetails;

//     const balancePendingAmount = new BigNumber(balanceDetails.pending, 10);
//     const balanceTotalPendingAmount = new BigNumber(balanceDetails.totalPending, 10);
//     const balanceTotalAmount = new BigNumber(balanceDetails.total, 10);

//     const expectedTotalAmount = new BigNumber(balanceAtBlock, 10);

//         // expect balance details to be correct considering the linked wallet
//     expect(balancePendingAmount.toString()).to.be.equal('0');
//     expect(balanceTotalPendingAmount.toString()).to.be.equal('0');
//     expect(balanceTotalAmount.toString()).to.be.equal(expectedTotalAmount.toString());
//     expect(balanceObj.userId).to.be.equal(user);
//     expect(balanceObj.applicationId).to.be.equal(app);
//     expect(balanceObj.linkedWallet).to.be.equal(walletAddress);
//   });

//   it('Successfully update mainchain balance of a linked wallet (2nd update)', async() => {
//     const user = 'user1';
//     const app = 'app1';

//     await pendingProps.externalBalanceUpdate(walletAddress, balanceAtBlock2, txHash2, blockNum2, timestamp2);
//     const timeOfStart = Math.floor(Date.now() / 1000);
//         // wait a bit for it to be on chain
//     await waitUntil(() => {
//       const timePassed =  Math.floor(Date.now() / 1000) - timeOfStart;
//       console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
//       return (timePassed > (waitTimeUntilOnChain));
//     },              300000, 1000);

//     const walletLinkAddress = pendingProps.CONFIG.earnings.namespaces.walletLinkAddress(walletAddress);
//     const walletLinkOnChain = await pendingProps.queryState(walletLinkAddress, 'walletlink');
//     console.log(`walletLinkOnChain=${JSON.stringify(walletLinkOnChain)}`);

//     const balanceAddress = pendingProps.CONFIG.earnings.namespaces.balanceAddress('', walletAddress);
//     const balanceOnChain = await pendingProps.queryState(balanceAddress, 'balance');
//     console.log(`balanceOnChain=${JSON.stringify(balanceOnChain)}`);
//     const balanceObj = balanceOnChain[0];
//     const balanceDetails = balanceObj.balanceDetails;


//     const userBalanceAddress = pendingProps.CONFIG.earnings.namespaces.balanceAddress(app, user);
//     const userBalanceOnChain = await pendingProps.queryState(userBalanceAddress, 'balance');
//     console.log(`userBalanceOnChain=${JSON.stringify(userBalanceOnChain)}`);
//     const userBalanceObj = userBalanceOnChain[0];
//     const userBalanceDetails = userBalanceObj.balanceDetails;

//         // expect balance details to be correct
//     expect(balanceDetails.pending).to.be.equal('0');
//     expect(balanceDetails.totalPending).to.be.equal('0');
//     expect(balanceDetails.total).to.be.equal(balanceAtBlock2);
//     expect(balanceDetails.timestamp).to.be.equal(parseInt(timestamp2,10));
//     expect(balanceDetails.lastEthBlockId).to.be.equal(parseInt(blockNum2,10));
//     expect(balanceObj.userId).to.be.equal(walletAddress);
//     expect(balanceObj.applicationId).to.be.equal('');
//     expect(balanceDetails.lastUpdateType).to.be.equal(1);
//     expect(balanceObj.type).to.be.equal(1);
//     expect(balanceObj.linkedWallet).to.be.equal('');

//         // expect user balance details to be correct
//     expect(userBalanceDetails.pending).to.be.equal('0');
//     expect(userBalanceDetails.totalPending).to.be.equal('0');
//     expect(userBalanceDetails.total).to.be.equal(balanceAtBlock2);
//     expect(userBalanceObj.userId).to.be.equal(user);
//     expect(userBalanceObj.applicationId).to.be.equal(app);
//     expect(userBalanceObj.type).to.be.equal(0);
//     expect(userBalanceObj.linkedWallet).to.be.equal(walletAddress);



//   });

//   it('Successfully link another app user to same wallet', async() => {
//     const app = 'app2';
//     const user = 'user1';
//     const linkedApp = 'app1';
//     const linkedUser = 'user1';
//     const sig =  await pendingProps.signMessage(`${app}${user}`, walletAddress, pk); // "signature21";

//         // issue
//     await pendingProps.linkWallet(walletAddress, app, user, sig);
//     const timeOfStart = Math.floor(Date.now() / 1000);
//         // wait a bit for it to be on chain
//     await waitUntil(() => {
//       const timePassed =  Math.floor(Date.now() / 1000) - timeOfStart;
//       console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
//       return (timePassed > waitTimeUntilOnChain);
//     },              10000, 1000);
//     const userBalanceAddress = pendingProps.CONFIG.earnings.namespaces.balanceAddress(app, user);
//     const balanceAddress = pendingProps.CONFIG.earnings.namespaces.balanceAddress('', walletAddress);
//     const walletLinkAddress = pendingProps.CONFIG.earnings.namespaces.walletLinkAddress(walletAddress);
//     const walletLinkOnChain = await pendingProps.queryState(walletLinkAddress, 'walletlink');
//     console.log(`walletLinkOnChain=${JSON.stringify(walletLinkOnChain)}`);

//     const balanceOnChain = await pendingProps.queryState(balanceAddress, 'balance');
//     console.log(`balanceOnChain=${JSON.stringify(balanceOnChain)}`);

//     const userBalanceOnChain = await pendingProps.queryState(userBalanceAddress, 'balance');
//     console.log(`userBalanceOnChain=${JSON.stringify(userBalanceOnChain)}`);

//     const balanceObj = balanceOnChain[0];
//     const balanceDetails = balanceObj.balanceDetails;
//     const userBalanceObj = userBalanceOnChain[0];
//     const userBalanceDetails = userBalanceObj.balanceDetails;
//     const walletApplicationUsers = walletLinkOnChain[0].usersList;

//         // expect balance details to be correct
//     expect(balanceDetails.pending).to.be.equal('0');
//     expect(balanceDetails.totalPending).to.be.equal('0');
//     expect(balanceDetails.total).to.be.equal(balanceAtBlock2);
//     expect(balanceDetails.timestamp).to.be.equal(parseInt(timestamp2,10));
//     expect(balanceDetails.lastEthBlockId).to.be.equal(parseInt(blockNum2,10));
//     expect(balanceObj.userId).to.be.equal(walletAddress);
//     expect(balanceObj.applicationId).to.be.equal('');
//     expect(balanceDetails.lastUpdateType).to.be.equal(1);
//     expect(balanceObj.type).to.be.equal(1);
//     expect(balanceObj.linkedWallet).to.be.equal('');

//         // expect user balance details to be correct
//     expect(userBalanceDetails.pending).to.be.equal('0');
//     expect(userBalanceDetails.totalPending).to.be.equal('0');
//     expect(userBalanceDetails.total).to.be.equal(balanceAtBlock2);
//     expect(userBalanceObj.userId).to.be.equal(user);
//     expect(userBalanceObj.applicationId).to.be.equal(app);
//     expect(userBalanceObj.type).to.be.equal(0);
//     expect(userBalanceObj.linkedWallet).to.be.equal(walletAddress);

//         // expect wallet link is correctly set up
//     expect(walletApplicationUsers.length).to.be.equal(2);
//     expect(walletLinkOnChain[0].address).to.be.equal(walletAddress);
//     expect(walletApplicationUsers[1].applicationId).to.be.equal(linkedApp);
//     expect(walletApplicationUsers[1].userId).to.be.equal(linkedUser);
//     expect(walletApplicationUsers[0].applicationId).to.be.equal(app);
//     expect(walletApplicationUsers[0].userId).to.be.equal(user);
//     expect(walletApplicationUsers[0].signature).to.be.equal(sig);
//   });

//   it('Successfully issue an earning to user with linked wallet with another user', async() => {
//     const addresses = {};
//     const app1 = 'app1';
//     const user1 = 'user1';
//     const app2 = 'app2';
//     const user2 = 'user1';
//         // issue
//     await pendingProps.issue(app1, user1, amounts[0], descriptions[0], addresses);
//     console.log(JSON.stringify(addresses));
//     earningAddresses = [];
//     earningAddresses.push(addresses['stateAddress']);
//     const timeOfStart = Math.floor(Date.now() / 1000);
//         // wait a bit for it to be on chain
//     await waitUntil(() => {
//       const timePassed =  Math.floor(Date.now() / 1000) - timeOfStart;
//       console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
//       return (timePassed > waitTimeUntilOnChain);
//     },              10000, 1000);
//     const balanceAddress1 = pendingProps.CONFIG.earnings.namespaces.balanceAddress(app1, user1);
//     const balanceOnChain1 = await pendingProps.queryState(balanceAddress1, 'balance');
//     const balanceAddress2 = pendingProps.CONFIG.earnings.namespaces.balanceAddress(app2, user2);
//     const balanceOnChain2 = await pendingProps.queryState(balanceAddress2, 'balance');
//     console.log(`balanceOnChain1=${JSON.stringify(balanceOnChain1)}`);
//     console.log(`balanceOnChain2=${JSON.stringify(balanceOnChain2)}`);

//     const balanceObj1 = balanceOnChain1[0];
//     const balanceDetails1 = balanceObj1.balanceDetails;
//     const balanceObj2 = balanceOnChain2[0];
//     const balanceDetails2 = balanceObj2.balanceDetails;

//     const balancePendingAmount1 = new BigNumber(balanceDetails1.pending, 10);
//     const balancePendingAmount2 = new BigNumber(balanceDetails2.pending, 10);
//     const balanceTotalPendingAmount1 = new BigNumber(balanceDetails1.totalPending, 10);
//     const balanceTotalPendingAmount2 = new BigNumber(balanceDetails1.totalPending, 10);
//     const balanceTotalAmount1 = new BigNumber(balanceDetails1.total, 10);
//     const balanceTotalAmount2 = new BigNumber(balanceDetails1.total, 10);

//     let expectedTotalPendingAmount = new BigNumber(amounts[0], 10);
//     expectedTotalPendingAmount = expectedTotalPendingAmount.times(1e18);
//     let expectedTotalAmount = new BigNumber(balanceAtBlock2, 10);
//     expectedTotalAmount = expectedTotalAmount.plus(expectedTotalPendingAmount);

//         // expect balance details to be correct considering the linked wallet
//     expect(balancePendingAmount1.div(1e18).toString()).to.be.equal(amounts[0].toString());
//     expect(balancePendingAmount2.div(1e18).toString()).to.be.equal('0');
//     expect(balanceTotalPendingAmount1.div(1e18).toString()).to.be.equal(amounts[0].toString());
//     expect(balanceTotalPendingAmount2.div(1e18).toString()).to.be.equal(amounts[0].toString());
//     expect(balanceTotalAmount1.toString()).to.be.equal(expectedTotalAmount.toString());
//     expect(balanceTotalAmount2.toString()).to.be.equal(expectedTotalAmount.toString());
//   });

//   it('Successfully revoke an earning of a user with a linked wallet with another user', async() => {
//     const addresses = {};
//     const app1 = 'app1';
//     const user1 = 'user1';
//     const app2 = 'app2';
//     const user2 = 'user1';
//     await pendingProps.revoke([earningAddresses[0]], addresses);
//     console.log(JSON.stringify(addresses));
//     const timeOfStart = Math.floor(Date.now() / 1000);
//         // wait a bit for it to be on chain
//     await waitUntil(() => {
//       const timePassed =  Math.floor(Date.now() / 1000) - timeOfStart;
//       console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
//       return (timePassed > waitTimeUntilOnChain);
//     },              10000, 1000);
//     const balanceAddress1 = pendingProps.CONFIG.earnings.namespaces.balanceAddress(app1, user1);
//     const balanceOnChain1 = await pendingProps.queryState(balanceAddress1, 'balance');
//     const balanceAddress2 = pendingProps.CONFIG.earnings.namespaces.balanceAddress(app2, user2);
//     const balanceOnChain2 = await pendingProps.queryState(balanceAddress2, 'balance');
//     console.log(`balanceOnChain1=${JSON.stringify(balanceOnChain1)}`);
//     console.log(`balanceOnChain2=${JSON.stringify(balanceOnChain2)}`);

//     const balanceObj1 = balanceOnChain1[0];
//     const balanceDetails1 = balanceObj1.balanceDetails;
//     const balanceObj2 = balanceOnChain2[0];
//     const balanceDetails2 = balanceObj2.balanceDetails;

//     const balancePendingAmount1 = new BigNumber(balanceDetails1.pending, 10);
//     const balancePendingAmount2 = new BigNumber(balanceDetails2.pending, 10);
//     const balanceTotalPendingAmount1 = new BigNumber(balanceDetails1.totalPending, 10);
//     const balanceTotalPendingAmount2 = new BigNumber(balanceDetails1.totalPending, 10);
//     const balanceTotalAmount1 = new BigNumber(balanceDetails1.total, 10);
//     const balanceTotalAmount2 = new BigNumber(balanceDetails1.total, 10);

//     let expectedTotalPendingAmount = new BigNumber('0', 10);
//     expectedTotalPendingAmount = expectedTotalPendingAmount.times(1e18);
//     let expectedTotalAmount = new BigNumber(balanceAtBlock2, 10);
//     expectedTotalAmount = expectedTotalAmount.plus(expectedTotalPendingAmount);

//         // expect balance details to be correct considering the linked wallet
//     expect(balancePendingAmount1.div(1e18).toString()).to.be.equal('0');
//     expect(balancePendingAmount2.div(1e18).toString()).to.be.equal('0');
//     expect(balanceTotalPendingAmount1.div(1e18).toString()).to.be.equal('0');
//     expect(balanceTotalPendingAmount2.div(1e18).toString()).to.be.equal('0');
//     expect(balanceTotalAmount1.toString()).to.be.equal(expectedTotalAmount.toString());
//     expect(balanceTotalAmount2.toString()).to.be.equal(expectedTotalAmount.toString());
//   });

  // TODO - add more tests for error scenarios such as replaying the same transaction, last eth block smaller than current, bad signatures, etc.

  after(async () => {

  });

});
