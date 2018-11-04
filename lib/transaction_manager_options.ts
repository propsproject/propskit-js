class TransactionManagerOptions {
  family_name: string;
  family_version: string;
  earning_prefix: string;
  host: string;
  port: number;  
  https: boolean;
  
  constructor(familyName: string, familyVersion: string, earning_prefix: string = 'earnings', host: string = '127.0.0.1', port: number = 8008, https: boolean = false) {
    this.family_name = familyName;
    this.family_version = familyVersion;
    this.earning_prefix = earning_prefix;
    this.host = host;
    this.port = port;
    this.https = https;
  }

  batchesUrl(): string {
    return this.httpPrefix() + this.host + ':' + this.port + '/batches';
  }

  stateUrl(address: string) {
    return this.httpPrefix() + this.host + ':' + this.port + '/state?address=' + address;
  }

  httpPrefix(): string {
    return this.https ? 'https://' : 'http://';
  }
  
}

export default TransactionManagerOptions;
