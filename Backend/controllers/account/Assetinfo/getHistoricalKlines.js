const Messages = require("../../../utils/messages");
const { coinLabelMap, klineIntervals } = require("./config");
const axios = require("axios");

const getData = async (customSymbol) => {
  const tradingPair = coinLabelMap[customSymbol];
  if (!tradingPair) {
    throw new Error(Messages.invalidAsset);
  }
  console.log(tradingPair, klineIntervals["1m"]);

  // Replace with the appropriate endpoint and parameters
  const url = `https://api.binance.com/api/v3/uiKlines?symbol=${tradingPair}&interval=${klineIntervals["1m"]}`;

  const response = await axios.get(url);
  return response.data;
};

const getHistoricalKlines = async (req, res) => {
  const { assetName } = req.body;
  try {
    const data = await getData(assetName);
    return res
      .status(200)
      .json({ message: Messages.requestSuccessful, payload: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: Messages.serverError });
  }
};

module.exports = getHistoricalKlines;
