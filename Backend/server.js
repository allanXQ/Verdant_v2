require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");
const DBconn = require("./config/dbConn");

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/app", require("./routes/app/getAppData"));
app.use("/api/v1/user", require("./routes/user/index"));

app.use("/api/v1/ZAdmin/assets", require("./routes/admin/assets"));

app.use(errorHandler);

DBconn(app, port);
