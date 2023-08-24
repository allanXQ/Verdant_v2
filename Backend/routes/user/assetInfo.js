const router = require("express").Router();
const { verifyjwt } = require("../../middleware/verifyjwt");
const getHistoricalKlines = require("../../controllers/account/Assetinfo/getHistoricalKlines");
const getAssets = require("../../controllers/account/Assetinfo/assets");
const { historicalKlinesSchema } = require("../../yupschemas");
const formValidate = require("../../middleware/validate");

router.post(
  "/historical-klines",
  formValidate(historicalKlinesSchema),
  getHistoricalKlines
);
router.get("/assets", verifyjwt, getAssets);

module.exports = router;
