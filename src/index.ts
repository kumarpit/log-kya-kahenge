import { Logging } from "./utils/LogManager";
import { LogEntry } from "./types";

Logging.registerConsoleLogger();

const logger = Logging.getLogger();

logger.error("test logging message")
console.warn("test")