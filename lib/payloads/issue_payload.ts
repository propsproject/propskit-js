import EarningPayload from './earning_payload';

interface IssuePayload extends EarningPayload {  
  description?: string;  
}

export default IssuePayload;
