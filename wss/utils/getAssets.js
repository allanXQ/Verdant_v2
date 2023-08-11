const Assets = require("../models/Assets");

const getAssets = async () => {
  await Assets.find();
};
