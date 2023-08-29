const router = require("express").Router();
const { verifyjwt } = require("../../middleware/verifyjwt");

const getHistoricalKlines = require("../../controllers/app/Assetinfo/getHistoricalKlines");
const { historicalKlinesSchema } = require("../../yupschemas");
const formValidate = require("../../middleware/validate");

router.post(
  "/historical-klines",
  verifyjwt,
  formValidate(historicalKlinesSchema),
  getHistoricalKlines
);

module.exports = router;
