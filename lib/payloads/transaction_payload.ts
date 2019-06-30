import { Method } from '../proto/payload_pb';
/**
 * @api TransactionPayload TransactionPayload
 * @apiName TransactionPayload
 * @apiGroup Interfaces
 * 
 *
 * @apiSuccessExample
 * interface TransactionPayload 
 * {
 *    transactionType: Method;
 *    userId: string;
 *    applicationId: string;
 *    amount: number;
 *    timestamp?: number;
 *    description: string;
 *    adminDescription?: string;
 *    fraudPeriod?: number;
 *    userDescription?: string;
 *  }
 */
interface TransactionPayload {
  transactionType: Method;
  userId: string;
  applicationId: string;
  amount: number;
  timestamp?: number;
  description: string;
  adminDescription?: string;
  fraudPeriod?: number;
  userDescription?: string;
}

export default TransactionPayload;
