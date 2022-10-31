export interface LogEntry {
    level: string;
    module?: string;
    location?: string;
    message: string;
}
  
export interface LogOptions {
    minLevels: { [module: string]: string }
}