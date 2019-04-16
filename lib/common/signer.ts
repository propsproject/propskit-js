// tslint:disable-next-line:no-submodule-imports
import {createContext, CryptoFactory} from 'sawtooth-sdk/signing';
// tslint:disable-next-line:no-submodule-imports
import {Secp256k1PrivateKey} from 'sawtooth-sdk/signing/secp256k1';

/**
 *
 *
 * @export
 * @class Secp256k1Signer
 */
export class Secp256k1Signer {
  context = createContext('secp256k1');
  public readonly signer : any;
  public readonly publickeyHex : string;
  public readonly publickeyBytes : Buffer;

  /**
   *Creates an instance of Secp256k1Signer.
   * @param {string} privateKeyHex hex encoded private key string
   * @memberof Secp256k1Signer
   */
  constructor(privateKeyHex : string) {
    const privateKeyBuff = Buffer.from(privateKeyHex, 'hex');
    const privateKey = new Secp256k1PrivateKey(privateKeyBuff);
    this.signer = new CryptoFactory(this.context).newSigner(privateKey);
    this.publickeyHex = this
      .signer
      .getPublicKey()
      .asHex();
    this.publickeyBytes = this
      .signer
      .getPublicKey()
      .asBytes();
  }

  get publickeyAsHex() : string {return this.publickeyHex;}
  get publickeyAsBytes() : Buffer {return this.publickeyBytes;}

  /**
   * Signs a payload
   *
   * @param {Uint8Array} payload
   * @returns {string}
   * @memberof Secp256k1Signer
   */
  sign(payload : Uint8Array) : string {
    return this
      .signer
      .sign(payload);
  }
};
