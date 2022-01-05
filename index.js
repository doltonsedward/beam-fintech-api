require("dotenv").config();
const express = require("express");

const app = express();
const router = require("./src/routes");
const port = process.env.PORT || 7500;

app.use(express.json());

app.use("/api/v1", router);

app.listen(port, () => console.log(`Server running in port: ${port}`));
