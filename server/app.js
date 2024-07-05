const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/appError");
const cors = require("cors");
var morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ credentials: true }));
express.urlencoded({ extended: false });

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
});

module.exports = app;