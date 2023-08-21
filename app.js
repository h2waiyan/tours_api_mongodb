const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tour_route");
const logger = require("./middlewares/logger");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());

// console.log(process.env);

app.use(logger.myLogger);
app.use(logger.reqTimeLog);

if (process.env.NODE_ENVIRONMENT == "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/tours", tourRouter);

module.exports = app;
