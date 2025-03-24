export enum LogLevel {
  NONE = 0,
  ERROR = 1,
  LOG = 2,
  WARN = 3,
  INFO = 4,
  DEBUG = 5,
  TRACE = 6
}

export const Logger = {
  currentLogLevel: LogLevel.LOG,

  log: (source: string, msg: string, title: boolean = false, args?: any) => {
    Logger.print(LogLevel.LOG, source, msg, title, args);
  },

  debug: (source: string, msg: string, title: boolean = false, args?: any) => {
    Logger.print(LogLevel.DEBUG, source, msg, title, args);
  },

  print: (printLevel: LogLevel, source: string, msg: string, title: boolean = false, args?: any) => {
    if(printLevel <= Logger.currentLogLevel) {
      const now = new Date().toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      const levelName = LogLevel[printLevel];
      if (title) {
        console.log("==================================================");
      }
      if (args) {
        console.log(`[${now}][${levelName}][${source}] ${msg}`, args);
      } else {
        console.log(`[${now}][${levelName}][${source}] ${msg}`);
      }
      if (title) {
        console.log("==================================================");
      }
    }
  }
}
