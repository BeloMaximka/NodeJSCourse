import fs from "node:fs";

class Logger {
  #filename;
  constructor(filename) {
    this.#filename = filename;
    fs.access(filename, !fs.constants.F_OK | fs.constants.W_OK, (err) => {
      if (err) {
        throw new Error(`Logger has no write access to file '${filename}'`);
      }
    });
  }

  logSync(level, message) {
    fs.appendFileSync(this.#filename, `[${level}] ${message}\n`);
  }

  logAsync(level, message) {
    fs.appendFile(this.#filename, `[${level}] ${message}\n`, (err) => {
      if (err) {
        throw new Error(`Logger is unable to write a message: ${err.message}`);
      }
    });
  }
}

const logger = new Logger("log.txt");
logger.logAsync("info", "async info");
logger.logAsync("warn", "async warn");
logger.logAsync("err", "async err");
logger.logSync("info", "sync info");
logger.logSync("warn", "sync warn");
logger.logSync("err", "sync err");
