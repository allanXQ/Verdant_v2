const Assets = require("../../models/Assets");

const getAssets = async () => {
  const assets = await Assets.find();
  if (assets) return assets;
  return false;
};

module.exports = getAssets;
