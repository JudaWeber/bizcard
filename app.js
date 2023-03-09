const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const debug = require("debug")("bizcard:app");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("./config/winston");

const apiRouter = require("./routes/api");

const app = express();

app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(morgan("combined", { stream: logger.stream.write }));
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);
app.use("/api/*", (req, res) => {
  throw new Error("error thrown navigate to");
});
app.use((err, req, res, next) => {
  global.logger.error({
    method: req.method,
    error: err.message,
    url: req.originalUrl,
  });
  next(err);
});
/* React*/
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;
