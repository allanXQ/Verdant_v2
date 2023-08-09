const Messages = require("../../../utils/messages");
const { coinLabelMap, klineIntervals } = require("./config");
const axios = require("axios");

const getData = async (customSymbol, klineInterval) => {
  const tradingPair = coinLabelMap[customSymbol];
  if (!tradingPair) {
    throw new Error(Messages.invalidAsset);
  }

  const url = `https://api.binance.com/api/v3/uiKlines?symbol=${tradingPair}&interval=${klineInterval}`;

  const response = await axios.get(url);
  return response.data;
};

const getHistoricalKlines = async (req, res) => {
  const { assetName, klineInterval } = req.body;
  try {
    if (!assetName || !klineInterval) {
      return res.status(400).json({ message: Messages.invalidRequest });
    }
    const data = await getData(assetName, klineInterval);
    return res
      .status(200)
      .json({ message: Messages.requestSuccessful, payload: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: Messages.serverError });
  }
};

module.exports = getHistoricalKlines;
