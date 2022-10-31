import EventEmitter from "events";
import { LogEntry, LogOptions } from "../types";
import { Logger } from "./Logger";

export class LogManager extends EventEmitter {
    private options:  LogOptions = {
        minLevels: {
            '': 'info'
        }
    }

    private isRegistered: boolean = false;

    public configure(options: LogOptions): LogManager {
        this.options = Object.assign({}, this.options, options);
        return this;
    }

    public getLogger() {
        return new Logger(this, 'info');
    }

    public onLogEntry(listener: (logEntry: LogEntry) => void): LogManager {
        this.on('log', listener);
        return this;
    }

    public registerConsoleLogger() {
        if (this.isRegistered) return this;

        this.onLogEntry((logEntry) => {
            const msg = `${logEntry.message}`;
            switch (logEntry.level) {
                case 'trace':
                    console.trace(msg);
                    break;
                case 'debug':
                    console.debug(msg);
                    break;
                case 'info':
                    console.info(msg);
                    break;
                case 'warn':
                    console.warn(msg);
                    break;
                case 'error':
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