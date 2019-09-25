import ActivityPayload from '../payloads/activity_payload';

const fs = require('fs');
import { TransactionManager, AppUserBalance, WalletBalance } from '../transaction_manager';
import TransactionPayload from '../payloads/transaction_payload';
const { exec } = require('child_process');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const waitUntil = require('async-wait-until');
chai.use(chaiAsPromised);
const expect = chai.expect;
const BigNumber = require('bignumber.js');
BigNumber.config({ EXPONENTIAL_AT: 1e+9 });
import * as mocha from 'mocha';
import { Method } from '../proto/payload_pb';
import WalletLinkPayload from '../payloads/wallet_link_payload';
const moment = require('moment');

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

const settlementTxHash = '0xd0dae165cd740518faf212781e4a707a738970c030d7a3b27f04109ca607447e';
const settlementAmount = 1; // which is 1e18 = 1000000000000000000
const settlementBalanceAtBlock = '428511433000000000000000';
const settlementTimestamp = '1553107867';
const settlementBlockNum = '3967331';


const lastEthBlockId1 = 3966915;
const lastEthBlockId2 = 3968211;

const options = {
  familyName: 'pending-earnings',
  familyVersion: '1.0',
  host: '127.0.0.1',
  port: 8008,
  rewardsStartTimestamp: 1561248000,
  secondsInDay: 120,  
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
    exec(`cd $GOPATH/src/github.com/propsproject/props-transaction-processor && go run cmd/main.go -c -f ./configs/development.json  >> /tmp/out.log 2>> /tmp/out.log && cd ${workingDir}`, (err, stdout, stderr) => {
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

  it('Successfully log a single activity', async() => {
    const appId = 'younow';
    const userId = 'abcdefghijkl';
    const day = 1;

    const activityPayload: ActivityPayload = {
      userId,
      applicationId: appId,
      date: day,
      timestamp: Math.floor(new Date().getTime() / 1000),
    };

    const tm:TransactionManager = new TransactionManager(options);
    const res: boolean = await tm.submitActivityLog(pkSawtooth, [activityPayload]);
    expect(res).to.be.equal(true);

    const timeOfStart = Math.floor(Date.now());
    await waitUntil(() => {
      const timePassed =  Math.floor(Date.now()) - timeOfStart;
      //   console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
      return (timePassed > waitTimeUntilOnChain);
    },              10000, 100);

    const activityAddress = tm.getActivityLogAddress(activityPayload.userId, activityPayload.applicationId);

    const activityOnChain = await tm.addressLookup(activityAddress, 'ACTIVITY_LOG');
    // expect earning details to be correct
    expect(activityOnChain.userId).to.be.equal(activityPayload.userId);
    expect(activityOnChain.applicationId).to.be.equal(activityPayload.applicationId);
    expect(activityOnChain.date.toString()).to.be.equal(activityPayload.date.toString());
    expect(activityOnChain.timestamp).to.be.equal(activityPayload.timestamp);

  });

  it('Successfully log multiple activities and fetch them with paging', async() => {    
    const day = 2;

    const activityPayload: ActivityPayload = {
      userId: '',
      applicationId: '',
      date: day,
      timestamp: Math.floor(new Date().getTime() / 1000),
    };
    
    const applicationUserIds = [{ userId: 'vnslv', appId: 'app1' },{ userId: 'sdf32', appId: 'app1' },{ userId: 'gsdg2', appId: 'app1' },{ userId: 'dsf9ss', appId: 'app1' },
    { userId: 'fsd2ds', appId: 'app1' }, { userId: 'woeur9', appId: 'app2' }, { userId: 'sfi832', appId: 'app2' }];

    const applicationUserLookup = {};
    for (let i:number = 0; i < applicationUserIds.length; i += 1) {
      applicationUserLookup[applicationUserIds[i].appId + '_' + applicationUserIds[i].userId] = i;
    }

    const tm:TransactionManager = new TransactionManager(options);
    for (let i:number = 0; i < applicationUserIds.length; i += 1) {
      activityPayload.userId = applicationUserIds[i].userId;
      activityPayload.applicationId = applicationUserIds[i].appId;
      const res: boolean = await tm.submitActivityLog(pkSawtooth, [activityPayload]);
      expect(res).to.be.equal(true);
    }
    

    const timeOfStart = Math.floor(Date.now());
    await waitUntil(() => {
      const timePassed =  Math.floor(Date.now()) - timeOfStart;
      //   console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
      return (timePassed > waitTimeUntilOnChain);
    },              10000, 100);

    const app1ActivityAddress = tm.getApplicationActivityLogDailyAddress(day, 'app1');
    // const app2ActivityAddress = tm.getApplicationActivityLogDailyAddress(day, 'app2');

    const activityOnChain = await tm.addressLookup(app1ActivityAddress, 'ACTIVITY_LOG', true, 2);
    for (let j:number = 0; j < activityOnChain.length; j += 1) {
      const appUserKey: string = activityOnChain[j].applicationId + '_' + activityOnChain[j].userId;
      expect(applicationUserIds[applicationUserLookup[appUserKey]].userId).to.be.equal(activityOnChain[j].userId);
      expect(applicationUserIds[applicationUserLookup[appUserKey]].appId).to.be.equal(activityOnChain[j].applicationId);
      expect(activityOnChain[j].date).to.be.equal(activityPayload.date);
      expect(activityOnChain[j].timestamp).to.be.equal(activityPayload.timestamp);
    }    
  });

  it('Successfully issue an earning', async() => {
    const app = '0xa80a6946f8af393d422cd6feee9040c25121a3b8';
    const user = 'user1';
    const transactionPayload: TransactionPayload = {
      transactionType: Method.ISSUE,
      userId: user,
      applicationId: app,
      amount: amounts[0],
      description: descriptions[0],
    };

    // issue
    const tm:TransactionManager = new TransactionManager(options);
    const res:boolean = await tm.submitIssueTransaction(pkSawtooth, [transactionPayload], issueTimestamp);
    expect(res).to.be.equal(true);
    const timeOfStart = Math.floor(Date.now());
    // wait a bit for it to be on chain
    await waitUntil(() => {
      const timePassed =  Math.floor(Date.now()) - timeOfStart;
      //   console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
      return (timePassed > waitTimeUntilOnChain);
    },              10000, 100);
    const earningAddress = tm.getTransactionStateAddress(Method.ISSUE, transactionPayload.applicationId, transactionPayload.userId, issueTimestamp);
    const earningOnChain = await tm.addressLookup(earningAddress, 'TRANSACTION');
    // console.log(`earningOnChain=${JSON.stringify(earningOnChain)}`);
    const balanceOnChain: AppUserBalance = await tm.getBalanceByAppUser(app, user);
    // console.log(`balanceOnChain=${JSON.stringify(balanceOnChain)}`);
    const earningPropsAmount = new BigNumber(earningOnChain.amount, 10);
    const balancePendingAmount = new BigNumber(balanceOnChain.pending, 10);
    const balanceTotalPendingAmount = new BigNumber(balanceOnChain.totalPending, 10);
    const balanceTotalAmount = new BigNumber(balanceOnChain.total, 10);

    // expect earning details to be correct
    expect(earningPropsAmount.div(1e18).toString()).to.be.equal(amounts[0].toString());
    expect(earningOnChain.userId).to.be.equal(user);
    expect(earningOnChain.applicationId).to.be.equal(app);
    expect(earningOnChain.description).to.be.equal(descriptions[0]);
    expect(earningOnChain.timestamp).to.be.equal(issueTimestamp);
    expect(earningOnChain.type).to.be.equal(Method.ISSUE);

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


  it('Successfully revoke an amount', async() => {
    const app = '0xa80a6946f8af393d422cd6feee9040c25121a3b8';
    const user = 'user1';
    const transactionPayload: TransactionPayload = {
      transactionType: Method.REVOKE,
      userId: user,
      applicationId: app,
      amount: amounts[1],
      description: descriptions[0] + '-revoke',
    };
    const revokeTimestamp: number = Math.floor(Date.now() / 1000);

    const tm:TransactionManager = new TransactionManager(options);
    const res:boolean = await tm.submitRevokeTransaction(pkSawtooth, [transactionPayload], revokeTimestamp);
    expect(res).to.be.equal(true);
    const timeOfStart = Math.floor(Date.now());
    // wait a bit for it to be on chain
    await waitUntil(() => {
      const timePassed =  Math.floor(Date.now()) - timeOfStart;
      //   console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
      return (timePassed > waitTimeUntilOnChain);
    },              10000, 100);
    const earningAddress = tm.getTransactionStateAddress(Method.REVOKE, transactionPayload.applicationId, transactionPayload.userId, revokeTimestamp);
    const earningOnChain = await tm.addressLookup(earningAddress, 'TRANSACTION');
    // console.log(`revokeOnChain=${JSON.stringify(revokeOnChain)}`);
    const balanceOnChain: AppUserBalance = await tm.getBalanceByAppUser(app, user);
    // console.log(`balanceOnChain=${JSON.stringify(balanceOnChain)}`);
    const revokedPropsAmount = new BigNumber(earningOnChain.amount, 10);
    const balancePendingAmount = new BigNumber(balanceOnChain.pending, 10);
    const balanceTotalPendingAmount = new BigNumber(balanceOnChain.totalPending, 10);
    const balanceTotalAmount = new BigNumber(balanceOnChain.total, 10);

    // expect revoke details to be correct
    expect(revokedPropsAmount.div(1e18).toString()).to.be.equal(amounts[1].toString());
    expect(earningOnChain.userId).to.be.equal(user);
    expect(earningOnChain.applicationId).to.be.equal(app);
    expect(earningOnChain.description).to.be.equal(transactionPayload.description);
    expect(earningOnChain.timestamp).to.be.equal(revokeTimestamp);
    expect(earningOnChain.type).to.be.equal(Method.REVOKE);

    // expect balance details to be correct
    expect(balancePendingAmount.div(1e18).toString()).to.be.equal((amounts[0] - amounts[1]).toString());
    expect(balanceTotalPendingAmount.div(1e18).toString()).to.be.equal((amounts[0] - amounts[1]).toString());
    expect(balanceTotalAmount.div(1e18).toString()).to.be.equal((amounts[0] - amounts[1]).toString());
    expect(balanceOnChain.userId).to.be.equal(user);
    expect(balanceOnChain.applicationId).to.be.equal(app);
    expect(balanceOnChain.lastUpdateType).to.be.equal(0);
    expect(balanceOnChain.type).to.be.equal(0);
    expect(balanceOnChain.linkedWallet).to.be.equal('');
  });


  it('Successfully update mainchain balance', async() => {
    const tm:TransactionManager = new TransactionManager(options);
    const res:boolean = await tm.submitBalanceUpdateTransaction(pkSawtooth, walletAddress, balanceAtBlock, txHash, blockNum, timestamp);
    expect(res).to.be.equal(true);
    const timeOfStart = Math.floor(Date.now());
    // wait a bit for it to be on chain
    await waitUntil(() => {
      const timePassed =  Math.floor(Date.now()) - timeOfStart;
      //   console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
      return (timePassed > (waitTimeUntilOnChain * longerTestWaitMultiplier));
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

  it('Successfully settle from mainchain settlement event', async() => {
    const tm:TransactionManager = new TransactionManager(options);
    const app1 = '0xa80a6946f8af393d422cd6feee9040c25121a3b8';
    const user1 = '32f2be121e8b2efc4b04a45511412f60';
    const user1Wallet = '0x2755ef71ec620348570bd8866045f97aca250ce1';    

    const settlementTxHash = '0x5645a41ccc7c7a757831369677dc1bc39d9c58b1cd8541e2306cfbbb32da0054';
    const settlementAmount = '5000000000000000000';
    const settlementTimestamp = 1563692060;
    const settlementBlockNum = 4770812;
    const settlementApplicationRewardsAddress = '0xd8186f92ba7cc1991f6e3ab842cb50c29bbfdc6a';
    const res:boolean = await tm.submitSettlementTransaction(pkSawtooth, app1, user1, settlementAmount, user1Wallet, settlementApplicationRewardsAddress, settlementTxHash, settlementBlockNum, settlementTimestamp, '25000000000000000000');
    expect(res).to.be.equal(true);
    const timeOfStart = Math.floor(Date.now());
    // wait a bit for it to be on chain
    await waitUntil(() => {
      const timePassed =  Math.floor(Date.now()) - timeOfStart;
      //   console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
      return (timePassed > (waitTimeUntilOnChain * longerTestWaitMultiplier));
    },              10000, 100);

    const balanceOnChain: AppUserBalance = await tm.getBalanceByAppUser(app1, user1);
    // console.log(`balanceOnChain=${JSON.stringify(balanceOnChain)}`);

    // expect balance details to be correct
    expect(balanceOnChain.pending).to.be.equal(`-${settlementAmount}`);
    expect(balanceOnChain.totalPending).to.be.equal(`-${settlementAmount}`);
    expect(balanceOnChain.transferable).to.be.equal('25000000000000000000');
    // expect(balanceOnChain.total).to.be.equal(`-${settlementAmount}`);        
  });

  it('Successfully link app user to wallet', async() => {
    const app = '0xa80a6946f8af393d422cd6feee9040c25121a3b8';
    const user = 'user1';
    const sig = await TransactionManager.signMessage(`${app}_${user}`, walletAddress, pk);
    const tm:TransactionManager = new TransactionManager(options);
    const walletPayload: WalletLinkPayload = {
      signature: sig,
      applicationId: app,
      address: walletAddress,
      userId: user,
    };    
    const res: boolean = await tm.submitLinkWalletTransaction(pkSawtooth, walletPayload);
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
    const balanceTotalAmount = new BigNumber(balanceOnChain.total,10);

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
    expect(balancePendingAmount.div(1e18).toString()).to.be.equal((amounts[0] - amounts[1]).toString());
    expect(balanceTotalPendingAmount.div(1e18).toString()).to.be.equal((amounts[0] - amounts[1]).toString());
    expect(balanceOnChain.transferable).to.be.equal(balanceAtBlock);
    const balanceAtBlockBN = new BigNumber(balanceAtBlock,10);
    const totalPendingBN = new BigNumber((amounts[0] - amounts[1]));
    const balanceAtBlockPlusTotalPending = balanceAtBlockBN.plus(totalPendingBN.times(1e18));
    expect(balanceTotalAmount.toString()).to.be.equal(balanceAtBlockPlusTotalPending.toString());
    expect(balanceOnChain.linkedWallet).to.be.equal(walletAddress);
  });

  it('Successfully update last eth block Id', async() => {
    const tm:TransactionManager = new TransactionManager(options);
    const res: boolean = await tm.submitNewEthBlockIdTransaction(pkSawtooth, lastEthBlockId1, Math.floor(new Date().getTime() / 1000));
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

  it('Successfully submit multiple transactions with batch', async() => {
    const app = '0xa80a6946f8af393d422cd6feee9040c25121a3b8';                 
    const user = 'user1';
    const transactionPayload: TransactionPayload = {
      transactionType: Method.ISSUE,
      userId: user,
      applicationId: app,
      amount: amounts[0],
      description: descriptions[0],
    };

    const tm:TransactionManager = new TransactionManager(options);
    const activityTimestamp = moment().unix();
    const rewardsDay = tm.calcRewardsDay(activityTimestamp);

    const activityPayload: ActivityPayload = {
      applicationId: app,
      userId: 'user3',
      timestamp: activityTimestamp,
      date: rewardsDay,
    };

    const issueTimestamp2 = Math.floor(Date.now() / 1000);
    
    tm.setAccumulateTransactions(true);
    const res2: boolean = await tm.submitNewEthBlockIdTransaction(pkSawtooth, lastEthBlockId2, activityTimestamp);
    const res3: boolean = await tm.submitBalanceUpdateTransaction(pkSawtooth, walletAddress, balanceAtBlock2, txHash2, blockNum2, timestamp2);
    const res4: boolean = await tm.submitActivityLog(pkSawtooth, [activityPayload]);
    const res1: boolean = await tm.submitIssueTransaction(pkSawtooth, [transactionPayload], issueTimestamp2);
    expect(res1).to.be.equal(true);
    expect(res2).to.be.equal(true);
    expect(res3).to.be.equal(true);
    expect(res4).to.be.equal(true);

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

    expect(ethBlockOnChain.id).to.be.equal(lastEthBlockId2);
    const balanceOnChain:WalletBalance = await tm.getBalanceByWallet(walletAddress);
    const expectedBalanceTotal = new BigNumber(balanceAtBlock2, 10);

    // expect balance details to be correct
    // const balanceOnChainTotalPending = new BigNumber(balanceOnChain.totalPending, 10);
    expect(balanceOnChain.pending).to.be.equal('0');
    expect(balanceOnChain.totalPending).to.be.equal('0');
    expect(balanceOnChain.transferable).to.be.equal(balanceAtBlock2);
    expect(balanceOnChain.wallet).to.be.equal(walletAddress);
    expect(balanceOnChain.lastUpdateType).to.be.equal(1);
    expect(balanceOnChain.type).to.be.equal(1);
    expect(balanceOnChain.linkedWallet).to.be.equal('');

    const earningAddress = tm.getTransactionStateAddress(Method.ISSUE, transactionPayload.applicationId, transactionPayload.userId, issueTimestamp2);
    const earningOnChain = await tm.addressLookup(earningAddress, 'TRANSACTION');
    const earningPropsAmount = new BigNumber(earningOnChain.amount, 10);
    const userBalanceOnChain: AppUserBalance = await tm.getBalanceByAppUser(app, user);
    // console.log(`userBalanceOnChain=${JSON.stringify(userBalanceOnChain)}`);
    const balancePendingAmount = new BigNumber(userBalanceOnChain.pending, 10);
    const balanceTotalPendingAmount = new BigNumber(userBalanceOnChain.totalPending, 10);
    const balanceTotalAmount = new BigNumber(userBalanceOnChain.total, 10);

    // expect earning details to be correct
    expect(earningPropsAmount.div(1e18).toString()).to.be.equal(amounts[0].toString());
    expect(earningOnChain.userId).to.be.equal(user);
    expect(earningOnChain.applicationId).to.be.equal(app);
    expect(earningOnChain.description).to.be.equal(descriptions[0]);
    expect(earningOnChain.timestamp).to.be.equal(issueTimestamp2);
    expect(earningOnChain.type).to.be.equal(Method.ISSUE);

    // expect balance details to be correct

    expect(balancePendingAmount.div(1e18).toString()).to.be.equal(((2 * amounts[0]) - amounts[1]).toString());
    expect(balanceTotalPendingAmount.div(1e18).toString()).to.be.equal(((2 * amounts[0]) - amounts[1]).toString());
    const totalPendingBN = new BigNumber(((2 * amounts[0]) - amounts[1]));
    expect(balanceTotalAmount.toString()).to.be.equal(totalPendingBN.times(1e18).plus(expectedBalanceTotal).toString());
    expect(userBalanceOnChain.transferable).to.be.equal(balanceAtBlock2);
    expect(userBalanceOnChain.userId).to.be.equal(user);
    expect(userBalanceOnChain.applicationId).to.be.equal(app);
    expect(userBalanceOnChain.lastUpdateType).to.be.equal(1);
    expect(userBalanceOnChain.type).to.be.equal(0);
    expect(userBalanceOnChain.linkedWallet).to.be.equal(walletAddress);

    // Expect activity be correct
    const activityLogAddress = await tm.getActivityLogAddress(activityPayload.userId, activityPayload.applicationId);
    const activityLookup = await tm.addressLookup(activityLogAddress, 'ACTIVITY_LOG');
    expect(activityLookup.userId).to.be.equal('user3');
    expect(activityLookup.applicationId).to.be.equal(app);
    expect(activityLookup.date.toString()).to.be.equal(rewardsDay.toString());
  });

/*
  it('Successfully update mainchain transfer with settlement', async() => {

    //const settlementTxHash = "0xd0dae165cd740518faf212781e4a707a738970c030d7a3b27f04109ca607447e";
    //const settlementAmount = 1; // which is 1e18 = 1000000000000000000
    //const settlementBalanceAtBlock = "428511433000000000000000";
    //const settlementTimestamp = "1553107867";
    //const settlementBlockNum = "3967331";

    const app = '0xa80a6946f8af393d422cd6feee9040c25121a3b8';
    const user = 'user1';
    const tm:TransactionManager = new TransactionManager(options);
    const res:boolean = await tm.submitBalanceUpdateTransaction(pkSawtooth, walletAddress, settlementBalanceAtBlock, settlementTxHash, Number(settlementBlockNum), Number(settlementTimestamp));
    expect(res).to.be.equal(true);
    const timeOfStart = Math.floor(Date.now());
    // wait a bit for it to be on chain
    await waitUntil(() => {
      const timePassed =  Math.floor(Date.now()) - timeOfStart;
      //   console.log(`waiting for transaction ${ Math.floor(Date.now() / 1000) - timeOfStart}...`);
      return (timePassed > (waitTimeUntilOnChain * longerTestWaitMultiplier));
    },              10000, 100);

    const userBalanceOnChain: AppUserBalance = await tm.getBalanceByAppUser(app, user);
    const settleTransactionAddress = tm.getTransactionStateAddress(Method.SETTLE, app, user, Number(settlementTimestamp));
    const earningOnChain = await tm.addressLookup(settleTransactionAddress, 'TRANSACTION');
    const earningPropsAmount = new BigNumber(earningOnChain.amount, 10);
    const expectedBalanceTotal = new BigNumber(settlementBalanceAtBlock, 10);

    // expect earning details to be correct
    expect(earningPropsAmount.div(1e18).toString()).to.be.equal('1');
    expect(earningOnChain.userId).to.be.equal(user);
    expect(earningOnChain.applicationId).to.be.equal(app);
    expect(earningOnChain.timestamp.toString()).to.be.equal(settlementTimestamp.toString());
    expect(earningOnChain.type).to.be.equal(Method.SETTLE);


    const balancePendingAmount = new BigNumber(userBalanceOnChain.pending, 10);
    const balanceTotalPendingAmount = new BigNumber(userBalanceOnChain.totalPending, 10);
    const balanceTotalAmount = new BigNumber(userBalanceOnChain.total, 10);

    expect(balancePendingAmount.div(1e18).toString()).to.be.equal(((2 * amounts[0]) - amounts[1] - 1).toString());
    expect(balanceTotalPendingAmount.div(1e18).toString()).to.be.equal(((2 * amounts[0]) - amounts[1] - 1).toString());
    const totalPendingBN = new BigNumber(((2 * amounts[0]) - amounts[1] - 1));
    expect(balanceTotalAmount.toString()).to.be.equal(totalPendingBN.times(1e18).plus(expectedBalanceTotal).toString());
    expect(userBalanceOnChain.transferable).to.be.equal(settlementBalanceAtBlock);
    expect(userBalanceOnChain.userId).to.be.equal(user);
    expect(userBalanceOnChain.applicationId).to.be.equal(app);
    expect(userBalanceOnChain.lastUpdateType).to.be.equal(0);
    expect(userBalanceOnChain.type).to.be.equal(0);
    expect(userBalanceOnChain.linkedWallet).to.be.equal(walletAddress);
  });*/

  // TODO - add more tests for error scenarios such as replaying the same transaction, last eth block smaller than current, bad signatures, etc.

  after(async () => {

  });

});
