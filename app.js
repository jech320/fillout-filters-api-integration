require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const axios = require("axios");

axios.defaults.baseURL = process.env.FILLOUT_API_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.FILLOUT_API_KEY}`;

const indexRouter = require("./routes/index");
const formsRouter = require("./routes/forms");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/forms", formsRouter);

module.exports = app;
