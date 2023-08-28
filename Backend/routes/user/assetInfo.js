const router = require("express").Router();
const { verifyjwt } = require("../../middleware/verifyjwt");

const getHistoricalKlines = require("../../controllers/app/Assetinfo/getHistoricalKlines");
const getAssets = require("../../controllers/app/Assetinfo/assets");
const { historicalKlinesSchema } = require("../../yupschemas");
const formValidate = require("../../middleware/validate");

router.post(
  "/historical-klines",
  formValidate(historicalKlinesSchema),
  getHistoricalKlines
);
router.get("/assets", verifyjwt, getAssets);

module.exports = router;
