const WebSocket = require("ws");
const express = require("express");
const http = require("http");
const DBconn = require("../config/dbConn");
const binanceClient = require("./utils/binanceClient");

const port = process.env.WSPORT || 2000;

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

DBconn()
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      binanceClient();
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
