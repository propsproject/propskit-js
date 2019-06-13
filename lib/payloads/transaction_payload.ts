import { Method } from '../proto/payload_pb';
interface TransactionPayload {
  transactionType: Method;
  userId: string;
  applicationId: string;
  amount: number;
  timestamp?: number;
  description: string;
  adminDescription?: string;
  fraudPeriod?: number;
}

export default TransactionPayload;
