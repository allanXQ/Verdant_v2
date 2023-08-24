require("dotenv").config();
const { WebsocketClient } = require("binance");
const getAssets = require("./getAssets");

const API_KEY = process.env.BINANCEAPIKEY;
const API_SECRET = process.env.BINANCEAPISECRET;

// optionally override the logger
const binanceClient = () => {
  try {
    const binanceWs = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@kline_1m"
    );

    binanceWs.onmessage = (message) => {
      const data = JSON.parse(message.data);
      const candlestick = {
        time: data.k.t,
        open: parseFloat(data.k.o),
        high: parseFloat(data.k.h),
        low: parseFloat(data.k.l),
        close: parseFloat(data.k.c),
      };
      console.log(candlestick);
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = binanceClient;
