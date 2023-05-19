import pino from "pino";

import pinoConfig from "../../config/pino";

const logger = pino(pinoConfig);

export default logger;
