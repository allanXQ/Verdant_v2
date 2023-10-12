const Messages = require("@utils");
const { Assets } = require("@models");

const getAssets = async (req, res) => {
  const assets = await Assets.find();

  for (let i = 0; i < assets.length; i++) {
    const asset = assets[i];
    const { assetName } = asset;
    const { lastPrice, priceChange } = await fetchTickerData(assetName);
    asset.lastPrice = lastPrice;
    asset.priceChange = priceChange;
  }
  return res.status(200).json({
    message: Messages.requestSuccessful,
    payload: {
      assets,
    },
  });
};

module.exports = getAssets;
