import winston from 'winston';
const timestamp = winston.format.timestamp;
import config from '../log_config';

export class Logger {

  private static log = null;

  static instance() : winston.Logger {
    if (this.log === null) {

      const additionalArgs = winston.format((info) => {
        info.app = process.env.APP_NAME;
        info.env = process.env.NODE_ENV;
        info.name = process.env.NAME;
        info.mode = process.env.SERVICE_NAME;
        return info;
      })

      this.log = winston.createLogger({
        format: winston.format.combine(
          additionalArgs(),
          timestamp(),
          winston.format.json()
        ),
        transports: [
          new winston.transports.Console(config.console),
        ],
      });
    }

    return this.log;
  }
}

export { Logger as default };
