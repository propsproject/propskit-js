import {createHash} from 'crypto';

export interface AddressBuilderI {
  readonly addPart : (s : string, startPos : number, endPos : number) => AddressBuilderI

  /**
   * hash something
   *
   *  * ### Example (es imports)
   * ```js
   * import { utils } from 'lib-props-js'
   * const hash = utils.AddressBuilder('').hash('hello', 0, 4)
   * ```
   *
   * @param s  the string to hash
   * @param startPos  start position of the substring to return
   * @param endPos  end position of the substring to return
   *
   */
  readonly hash : (s : string, startPos : number, endPos : number) => string

  /**
   * strip the '0x' prefix from a string
   *
   *  * ### Example (es imports)
   * ```js
   * import { utils } from 'lib-props-js'
   * const hash = utils.AddressBuilder('').stripPrefix('0xhello')
   * // => 'hello'
   * ```
   *
   * @param s  the string to strip
   *
   */
  readonly stripPrefix : (s : string) => string
  readonly normalizeAddress : (s : string) => string
  readonly build : () => string
}

/**
 * Build state addresses using this builder.
 *
 *  * ### Example (es imports)
 * ```js
 * import { utils } from 'lib-props-js'
 * import { pendingprops } from 'lib-props-js'
 * const pendingEarningAddress = utils.AddressBuilder(pendingprops.NamespacePrefixes.pending())
 *      .addPart(recipientEthAddr, 0, 4)
 *      .addPart(applicationEthAddr, 0, 4)
 *      .addPart(`${recipientEthAddr}${applicationEthAddr}${earning.getSignature()}`, 0, 56)
 *      .build();
 * // => 'a7db4627143bbdb411abb99f37ad8c7f04f35148478830155b9f8507519064c3622b1b'
 * ```
 *
 * @param addr  the prefix that will start this address
 *
 */
export const AddressBuilder = (addr : string) : AddressBuilderI => {
  const address : string = addr;

  const addPart = (s : string, startPos : number, endPos : number) => {
    const part = hash(s, startPos, endPos);
    return AddressBuilder(address.concat(part));
  };

  const hash = (s : string, startPos : number, endPos : number) : string => {
    return createHash('sha512')
      .update(s)
      .digest('hex')
      .substring(startPos, endPos);
  };

  const stripPrefix = (str : string) : string => {
    return str.substr(0, 2) === '0x'
      ? str.substr(2)
      : str;
  };

  const normalizeAddress = (str : string) : string => {
    if (str.length > 0) {
      if (str.substr(0,2) === '0x') {
          return str.toLowerCase();
      } else {
          return `0x${str.toLowerCase()}`
      }
    }
    return str;
  };

  function build() : string {return address;}

  return Object.freeze({addPart, hash, stripPrefix, normalizeAddress, build});
};
