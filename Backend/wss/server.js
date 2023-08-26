const express = require("express");
const http = require("http");
const cors = require("cors");
const WebSocket = require("ws");

const { Server } = require("socket.io");

const DBconn = require("../config/dbConn");
// const binanceClient = require("./utils/binanceClient");

const port = process.env.WSPORT || 2000;

const app = express();
// app.use(
//   cors({
//     origin: "*",
//     allowedHeaders: ["Access-Control-Allow-Origin"],
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//     },
//     credentials: true,
//   })
// );
const server = http.createServer(app);

const wss = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // replace with your client origin
    credentials: true,
  },
});

const binanceClient = new WebSocket(
  "wss://stream.binance.com:9443/ws/btcusdt@kline_1m"
);

binanceClient.onclose = (close) => {
  console.log(close);
};

wss.on("connection", (socket) => {
  // Extract the coin pair from the namespace.

  socket.on("requestKlines", (data) => {
    console.log(data.assetName, data.klineInterval);

    // You can handle the data fetching for the coin pair here
    binanceClient.onerror = (error) => {
      console.log(error);
    };
    binanceClient.onmessage = (message) => {
      const data = JSON.parse(message.data);
      const candlestick = {
        time: data.k.t,
        open: parseFloat(data.k.o),
        high: parseFloat(data.k.h),
        low: parseFloat(data.k.l),
        close: parseFloat(data.k.c),
      };
      console.log(candlestick);
      socket.emit("klineData", {
        candlestick,
        /* mock data here, potentially based on coinPair */
      });
    };
  });

  socket.on("disconnect", () => {
    binanceClient.close();
    console.log(`User disconnected from `);
  });
});

DBconn(server, port);
