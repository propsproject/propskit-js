interface EarningPayload {
  userId: string;
  applicationId: string;
  amount: number;  
  timestamp?: number;
}

export default EarningPayload;
