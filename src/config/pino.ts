import { LoggerOptions } from "pino";

const pinoConfig: LoggerOptions = {};

const shouldUsePrettyPrint = true;

if (shouldUsePrettyPrint) {
  pinoConfig.prettyPrint = {
    colorize: true,
  };
}

export default pinoConfig;
