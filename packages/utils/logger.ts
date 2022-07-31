export interface LogFn {
  <T extends object>(msg: T | string): void;
}

export interface Logger {
  trace: LogFn;
  debug: LogFn;
  info: LogFn;
  warn: LogFn;
  error: LogFn;
  fatal: LogFn;
}

export class ConsoleLogger implements Logger {
  trace<T extends object>(msg: T | string) {
    console.trace(msg);
  }
  debug<T extends object>(msg: T | string) {
    console.debug(msg);
  }
  info<T extends object>(msg: T | string) {
    console.info(msg);
  }
  warn<T extends object>(msg: T | string) {
    console.warn(msg);
  }
  error<T extends object>(msg: T | string) {
    console.error(msg);
  }
  fatal<T extends object>(msg: T | string) {
    console.error(msg);
  }
}
