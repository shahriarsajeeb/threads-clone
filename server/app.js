const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ErrorHandler = require("./middleware/error");
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: ".env",
  });
}

// Route imports
const user = require("./routes/user");
const post = require("./routes/Post");

app.use("/api/v1", user);
app.use("/api/v1", post);

// it's for errorHandeling
app.use(ErrorHandler);

module.exports = app;
