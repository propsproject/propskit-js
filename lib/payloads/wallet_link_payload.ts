/**
 * @api WalletLinkPayload WalletLinkPayload
 * @apiName WalletLinkPayload
 * @apiGroup Interfaces
 *
 *
 * @apiSuccessExample
 * interface WalletLinkPayload
 * {
 *    userId: string;
 *    applicationId: string;
 *    address: string;
 *    signature: string;
 *  }
 */
interface WalletLinkPayload {
  userId: string;
  applicationId: string;
  address: string;
  signature: string;
}

export default WalletLinkPayload;
