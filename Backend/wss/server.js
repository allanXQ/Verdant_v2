const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const DBconn = require("../config/dbConn");
const binanceClient = require("./utils/binanceClient");

const port = process.env.WSPORT || 2000;

const app = express();
app.use(cors());
const server = http.createServer(app);

const wss = new Server(server, {
  origin: "*", // replace with your client origin
  methods: ["GET", "POST"],
  // allowedHeaders: ["my-custom-header"],
  // credentials: true
});

wss.of(/^\/ws\/\w+\/\w+$/).on("connection", (socket) => {
  // Extract the coin pair from the namespace.
  const details = socket.nsp.name.split("/");
  const coinPair = details[2];
  const klineInterval = details[3];
  console.log(`User connected to ${coinPair}`);

  socket.on("requestKlines", () => {
    console.log(`User requested klines for ${coinPair}`);
    // You can handle the data fetching for the coin pair here
    binanceClient(coinPair, klineInterval);
    binanceClient.onmessage = (message) => {
      const data = JSON.parse(message.data);
      const candlestick = {
        time: data.k.t,
        open: parseFloat(data.k.o),
        high: parseFloat(data.k.h),
        low: parseFloat(data.k.l),
        close: parseFloat(data.k.c),
      };
      socket.emit("klineData", {
        candlestick,
        /* mock data here, potentially based on coinPair */
      });
    };
  });

  socket.on("disconnect", () => {
    binanceClient.close();
    console.log(`User disconnected from ${coinPair}`);
  });
});

DBconn(app, port);
binanceClient();
