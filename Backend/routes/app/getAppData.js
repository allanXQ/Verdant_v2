const router = require("express").Router();
const { verifyjwt } = require("../../middleware/verifyjwt");
const getAppData = require("../../controllers/app/Assetinfo/getAppData");
const getHistoricalKlines = require("../../controllers/app/Assetinfo/getHistoricalKlines");
const formValidate = require("../../middleware/validate");

const { historicalKlinesSchema } = require("../../yupschemas");

router.get("/general-data", getAppData);

router.post(
  "/historical-klines",
  verifyjwt,
  formValidate(historicalKlinesSchema),
  getHistoricalKlines
);

module.exports = router;
