import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

const levels = {
  debug: 0,
  error: 1,
  warn: 2,
  http: 3,
  verbose: 4,
  log: 5,
  silly: 6,
  info: 7,
};
export const logger = WinstonModule.createLogger({
  format: format.combine(format.timestamp(), format.json()),
  // silent: Boolean(Env.LOGGER.LOGGING_ENABLED),
  levels: levels,
  transports: [
    new transports.Console({
      format: format.combine(
        format.cli(),
        format.printf((info) => {
          return `${info.timestamp} ${info.level}: ${info.message}`;
        }),
      ),
    }),
  ],
});
