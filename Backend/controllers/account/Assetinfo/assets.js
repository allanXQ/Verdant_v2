const Assets = require("../../../models/Assets");

const getAssets = async (req, res) => {
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
    return res.json({ status: 500, message: "An error occurred" });
  }
};

module.exports = getAssets;
