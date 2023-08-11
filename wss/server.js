require("dotenv").config();
// const { WebsocketClient } = require("binance");
const Binance = require("binance-client").default;

const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const port = process.env.WSPORT || 2000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const API_KEY = process.env.BINANCEAPIKEY;
const API_SECRET = process.env.BINANCEAPISECRET;

// optionally override the logger
try {
  const wsClient = new Binance({
    api_key: API_KEY,
    api_secret: API_SECRET,
    beautify: true,
    // Disable ping/pong ws heartbeat mechanism (not recommended)
    // disableHeartbeat: true
  }).ws;
  const wsymbol = "BTCUSDT";
  const interval = "1d";
  wsClient.trades(wsymbol, (trade) => {
    // const {e:eventType, E:eventTime, s:symbol, t:tradeId, p:price, q:quantity, b:buyerOrderId, a: sellerOrderId, T:tradeTime, m:maker, M:ignored} = trade;
    console.log(trade);
  });

  // wsClient.ws.candles(wsymbol, interval, (candle) => {
  //   // const {open, close, high, low, volume, trades,interval, startTime,closeTime, isFinal} = candle;
  //   console.log(candle);
  // });
  app.listen(port, () => {
    console.log(`WebSocketServer running on ${port}`);
  });
} catch (error) {
  console.log(error);
}
