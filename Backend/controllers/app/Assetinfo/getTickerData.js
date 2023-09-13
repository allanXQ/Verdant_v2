const { findQuery } = require("../../../services");
const Messages = require("../../../utils/messages");
const { klineIntervals } = require("./config");
const Assets = require("../../../models/Assets");
const { default: axios } = require("axios");

const getTickerData = async (req, res, next) => {
  const assets = await findQuery(Assets);
  const assetUpdate = assets.map(async (asset) => {
    const tradingPair = asset.coinPair;
    const url = `https://api.binance.com/api/v3/ticker/24hr?symbol=${tradingPair}`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      asset.price = parseFloat(data.lastPrice, 10);
      asset.priceChange = parseFloat(data.priceChange, 10);
      console.log(asset);
      return asset;
    } catch (err) {
      console.log(err.message);
    }
  });

  await Promise.all(assetUpdate);

  return res.status(200).json({
    message: Messages.requestSuccessful,
    payload: {
      assets,
      klineIntervals,
    },
  });
};

module.exports = getTickerData;
