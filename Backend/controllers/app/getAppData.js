const Messages = require("../../utils/messages");
const getAssets = require("./Assetinfo/assets");
const { klineIntervals } = require("./Assetinfo/config");

const getAppData = async (req, res, next) => {
  try {
    const assets = await getAssets();
    return res.status(200).json({
      message: Messages.requestSuccessful,
      payload: {
        assets,
        klineIntervals,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAppData;
