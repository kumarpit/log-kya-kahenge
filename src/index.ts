import { Logging } from "./utils/LogManager";

const log = Logging.getLogger();

Logging.registerConsoleLogger();

function testLogging() {
    log.error("test logging message")
}

testLogging();