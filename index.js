require("dotenv").config();
const express = require("express");
const app = express();

// app.use('api/v1')
const port = process.env.PORT || 7500;

app.listen(port, () => console.log(`Server running in port: ${port}`));
