const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const logPath = path.join(__dirname, "..", "..", "logs");

const logEvents = async (message, logFilename) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(logPath)) {
      await fsPromises.mkdir(logPath);
    }

    await fsPromises.appendFile(path.join(logPath, logFilename), logItem);
  } catch (error) {
    console.log(error);
  }
};

const logger = (request, response, next) => {
  logEvents(
    `${request.method}\t${request.url}\t${request.headers.origin}`,
    "requests.log"
  );
  next();
};

module.exports = { logEvents, logger };
