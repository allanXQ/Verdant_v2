const WebSocket = require("ws");
const express = require("express");
const http = require("http");
const server = http.createServer(app);
const DBconn = require("./config/dbConn");

const port = process.env.WSPORT || 2000;

const app = express();

const wss = new WebSocket.Server({ server });

DBconn()
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
