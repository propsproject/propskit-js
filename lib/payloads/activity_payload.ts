/**
 * @api ActivityPayload ActivityPayload
 * @apiName ActivityPayload
 * @apiGroup Interfaces
 * 
 *
 * @apiSuccessExample
 * interface ActivityPayload 
 * {
 *    userId: string;
 *    applicationId: string;
 *    date: number;
 *    timestamp: number;
 *  }
 */
interface ActivityPayload {
  userId: string;
  applicationId: string;
  date: number;
  timestamp: number;
}

export default ActivityPayload;
