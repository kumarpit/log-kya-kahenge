import EventEmitter from "events";
import { LogEntry, LogLevel, LEVELS, LogLevelConfig } from "../types";


export class Logger {
    private logManager: EventEmitter;
    private minLevel: number;

    constructor(logManager: EventEmitter, minLevel: LogLevelConfig) {
        this.logManager = logManager;
        if (minLevel === "_ALL") this.minLevel = -1;
        else this.minLevel = this.levelToInt(minLevel);
    }

    private levelToInt(minLevel: LogLevel): number {
        return LEVELS[minLevel];
    }

    public log(logLevel: LogLevel, message: any): void {
        const level = this.levelToInt(logLevel);
        if (level < this.minLevel) return;

        const logEntry: LogEntry = { level: logLevel, message };

        const error = new Error();
        if (error.stack) {
            const cla = error.stack.split("\n");
            let idx = 1;

            while (idx < cla.length && cla[idx].includes("at Logger.")) idx++;
            
            if (idx < cla.length) {
                logEntry.location = cla[idx].slice(cla[idx].indexOf("at ") + 3, cla[idx].length);
            }
        }
        
        this.logManager.emit('log', logEntry);
    }

    public trace(message: any): void { this.log('TRACE', message); }
    public debug(message: any): void { this.log('DEBUG', message); }
    public info(message: any): void  { this.log('INFO', message); }
    public warn(message: any): void  { this.log('WARN', message); }
    public error(message: any): void { this.log('ERROR', message); }
}