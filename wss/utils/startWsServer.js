require("dotenv").config();
const { WebsocketClient } = require("binance");

const API_KEY = process.env.BINANCEAPIKEY;
const API_SECRET = process.env.BINANCEAPISECRET;

// optionally override the logger
const startWsServer = () => {
  try {
    const wsClient = new WebsocketClient({
      api_key: API_KEY,
      api_secret: API_SECRET,
      beautify: true,
    });
    wsClient.on("open", (data) => {
      console.log("connection opened open:", data.wsKey, data.ws.target.url);
    });

    wsClient.on("formattedMessage", (data) => {
      switch (data.eventType) {
        case "kline":
          console.log("kline");
          break;
        case "24hrMiniTicker":
          console.log("24hrMiniTicker");
          break;
        default:
          break;
      }
      console.log("formattedMessage: ", data);
    });

    wsClient.on("reply", (data) => {
      console.log("log reply: ", JSON.stringify(data, null, 2));
    });

    wsClient.on("reconnecting", (data) => {
      console.log("ws automatically reconnecting.... ", data?.wsKey);
    });

    wsClient.on("reconnected", (data) => {
      console.log("ws has reconnected ", data?.wsKey);
    });

    wsClient.on("error", (data) => {
      console.log("ws saw error ", data?.wsKey);
    });

    wsClient.on("close", (data) => {
      console.log("ws saw close ", data?.wsKey);
    });

    const market = "BTCUSDT";
    const interval = "1m";

    wsClient.subscribeSpotKline(market, interval);
    wsClient.subscribeSpotSymbolMini24hrTicker(market);
  } catch (error) {
    console.log(error);
  }
};

module.exports = startWsServer;
