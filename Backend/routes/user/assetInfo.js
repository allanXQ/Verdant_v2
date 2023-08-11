const router = require("express").Router();
const { verifyjwt } = require("../../middleware/verifyjwt");
const getHistoricalKlines = require("../../controllers/account/Assetinfo/getHistoricalKlines");
const getAssets = require("../../controllers/account/Assetinfo/assets");

router.get("/historical-klines", verifyjwt, getHistoricalKlines);
router.get("/assets", verifyjwt, getAssets);

module.exports = router;
