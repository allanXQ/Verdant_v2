require("dotenv").config();
const WebSocket = require("ws");
const getAssets = require("./getAssets");

const API_KEY = process.env.BINANCEAPIKEY;
const API_SECRET = process.env.BINANCEAPISECRET;

// optionally override the logger
const binanceClient = () => {
  const binanceWs = new WebSocket(
    "wss://stream.binance.com:9443/ws/btcusdt@kline_1m"
  );

  binanceWs.onclose = (close) => {
    console.log(close);
  };
  binanceWs.onerror = (error) => {
    console.log(error);
  };

  return binanceWs;
};

module.exports = binanceClient;
