const server = require('./app');
const mongoose = require('mongoose');
const { logEvents } = require("./v1/middlewares/logger.js");

const PORT = process.env.PORT || 3500;
mongoose.connection.once("open", () => {
  server.listen(PORT, () => {
    console.log(
      `Server is running in ${process.env.NODE_ENV} mode, at http://localhost:${PORT}`
    );
  });
});

mongoose.connection.on("error", (error) => {
  logEvents(
    `${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`,
    "mongo_errors.log"
  );
});
