const router = require("express").Router();
const { verifyjwt } = require("../../middleware/verifyjwt");
const getTickerData = require("../../controllers/app/Assetinfo/getTickerData");
const getHistoricalKlines = require("../../controllers/app/Assetinfo/getHistoricalKlines");
const formValidate = require("../../middleware/validate");

const { historicalKlinesSchema } = require("../../yupschemas");
const errorHOC = require("../../utils/errorHOC");

router.get("/general-data", errorHOC(getTickerData));

router.post(
  "/historical-klines",
  verifyjwt,
  formValidate(historicalKlinesSchema),
  errorHOC(getHistoricalKlines)
);

module.exports = router;
