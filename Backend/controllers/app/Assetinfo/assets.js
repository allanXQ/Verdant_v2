const Assets = require("../../../models/Assets");

const getAssets = async (req, res, next) => {
  try {
    const assets = await Assets.find();
    if (assets) {
      return res.json({
        status: 200,
        message: "assets retrieved",
        payload: assets,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getAssets;
