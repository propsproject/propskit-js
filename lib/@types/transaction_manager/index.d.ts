import { LogFunction } from '../../transaction_manager';
import TransactionManagerOptions from '../../transaction_manager_options';
import IssuePayload from '../../payloads/issue_payload';
declare module 'transaction_manager' {    
    export interface SubmitAPIResponse {
        batch_status_uri: string;   
        batch_id: string; 
    }
      
    export interface StatusAPIResponse {
        batch_id: string;    
        status: string;
    }
    
    export interface BatchDetailsTransaction {
        trasnaction_id: string;
        state_address: string;
    } 

    export class TransactionManager {
        constructor(appPrivateKey: string, options: TransactionManagerOptions, logFunction: LogFunction);
        getPrivateKey(): string;
        getPublicKey(): string;
        getSubmitResponse(): SubmitAPIResponse;
        getIssueStateAddress(payload: IssuePayload, timestamp: number): string
        submitRevokeTransaction(stateAddresses:string[]):Promise<boolean>;
        submitIssueTransaction(issuePayloads:IssuePayload[], timestamp: number):Promise<boolean>;
        statusLookup(batch_uri: string): Promise<boolean>;
        addressLookup(address: string): Promise<any>;
        batchLookup(batch_id: string): Promise<BatchDetailsTransaction[]>
    }
}