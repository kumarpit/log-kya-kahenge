import EventEmitter from "events";
import { LogEntry, LogOptions, LogOptionsConfig } from "../types";
import { Logger } from "./Logger";

export class LogManager extends EventEmitter {
    private options: LogOptions = {
        minLevel: '_ALL',
        prod: true
    }

    private isRegistered: boolean = false;

    public configure(options: LogOptionsConfig): LogManager {
        this.options = Object.assign({}, this.options, options);
        return this;
    }

    public getLogger() {
        return new Logger(this, this.options.minLevel);
    }

    public onLogEntry(listener: (logEntry: LogEntry) => void) {
        this.on('log', listener);
    }

    public registerConsoleLogger() {
        if (this.isRegistered) return this;

        this.onLogEntry((logEntry) => {
            const msg = `[${logEntry.level}] ${logEntry.location? logEntry.location : ''} ${logEntry.message}`;
            switch (logEntry.level) {
                case 'TRACE':
                    console.trace(msg);
                    break;
                case 'DEBUG':
                    console.debug(msg);
                    break;
                case 'INFO':
                    console.info(msg);
                    break;
                case 'WARN':
                    console.warn(msg);
                    break;
                case 'ERROR':
                    console.error(msg);
                    break;
                default:
                    console.log(`{${logEntry.level}} ${msg}`);
            }
        });

        this.isRegistered = true;
        return this;
    }
}

export const Logging = new LogManager();