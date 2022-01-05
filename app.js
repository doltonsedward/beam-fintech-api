require("dotenv").config();
const express = require("express");

const app = express();
const router = require("./src/routes");

app.use(express.json());

app.use("/api/v1", router);

module.exports = app;
