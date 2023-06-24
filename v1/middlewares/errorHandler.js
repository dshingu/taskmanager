const { logEvents } = require("./logger");

const errorHandler = (error, request, response, next) => {
  logEvents(
    `${error.name}: ${error.message}\t${request.method}\t${request.url}\t${request.headers.origin}`,
    "errors.log"
  );

  const status = response.statusCode ? response.statusCode : 5000; // server error
  response.status(status);
  response.json({ message: error.message });
};

module.exports = errorHandler;
