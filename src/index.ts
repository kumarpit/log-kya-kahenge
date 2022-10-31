import { Logging } from "./utils/LogManager";

const log = Logging.configure({ prod: false }).getLogger();

Logging.registerConsoleLogger();

function testLogging() {
    log.error("test logging message")
}

testLogging();