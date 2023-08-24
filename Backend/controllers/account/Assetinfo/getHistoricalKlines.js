const Messages = require("../../../utils/messages");
const { coinLabelMap, klineIntervals } = require("./config");
const axios = require("axios");

const getData = async (assetName, klineInterval) => {
  const tradingPair = coinLabelMap[assetName];
  if (!tradingPair) {
    throw new Error(Messages.invalidAsset);
  }

  const url = `https://api.binance.com/api/v3/uiKlines?symbol=${tradingPair}&interval=${klineInterval}`;

  return await axios
    .get(url)
    .then((response) => {
      const data = response.data;
      console.log(data);
      const formattedData = data.map((item) => {
        return {
          time: item[0], // Convert to UNIX timestamp (seconds)
          open: parseFloat(item[1], 10),
          high: parseFloat(item[2], 10),
          low: parseFloat(item[3], 10),
          close: parseFloat(item[4], 10),
        };
      });
      return formattedData;
    })
    .catch((err) => {
      // console.log(err);
      return [];
    });

  // console.log(formattedData);
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
