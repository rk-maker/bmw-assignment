const express = require("express");
const mongoose = require("mongoose");
const routes = require("./Routes/routes");
const constants = require("./constants");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
app.use(express.json());
app.use(`/${constants.method}/${constants.version}/${constants.bmw}`, routes);
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    app.listen(process.env.PORT, () => {});
  })
  .catch((err) => {});
