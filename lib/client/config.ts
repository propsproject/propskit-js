import {Secp256k1Signer} from '../common/signer';

/**
 *
 *
 * @export
 * @class Config
 */
export class Config {
  public readonly signer : Secp256k1Signer;
  /**
   * Creates an instance of Config.
   * @param {string} uri
   * @param {string} privateKeyHex
   * @memberof Config
   */
  constructor(public readonly uri : string, privateKeyHex : string) {
    this.signer = new Secp256k1Signer(privateKeyHex)
  }
};
