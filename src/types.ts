export interface LogEntry {
    level: LogLevel;
    location?: string;
    message: string;
}
  
export interface LogOptions {
    minLevel: LogLevelConfig,
    prod: boolean
}

export interface LogOptionsConfig {
    minLevel?: LogLevel,
    prod?: boolean
}

export const LEVELS = {
    "TRACE": 1,
    "DEBUG": 2,
    "INFO": 3,
    "WARN": 4,
    "ERROR": 5,
 };

export type LogLevel = keyof typeof LEVELS;

export type LogLevelConfig = LogLevel | "_ALL";