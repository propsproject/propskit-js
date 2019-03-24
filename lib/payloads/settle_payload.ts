import EarningPayload from './earning_payload';

interface SettlePayload extends EarningPayload {  
  wallet: string;  
}

export default SettlePayload;
