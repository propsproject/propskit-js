declare module 'transaction_manager_options' {        
    export class TransactionManagerOptions {
        constructor(familyName: string, familyVersion: string, earning_prefix: string, host: string, port: number, https: boolean);
        batchesUrl(): string;
        stateUrl(address: string);
        httpPrefix(): string;
    }
}