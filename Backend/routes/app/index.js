const router = require("express").Router();
const { verifyjwt } = require("@middleware/verifyjwt");
const getTickerData = require("@controllers/app/Assetinfo/getTickerData");
const getHistoricalKlines = require("@controllers/app/Assetinfo/getHistoricalKlines");
const formValidate = require("@middleware/validate");

const { historicalKlinesSchema } = require("@yupschemas");
const errorHOC = require("@utils/errorHOC");
const getP2PTrades = require("@controllers/app/trades/p2p/getTrades");

router.get("/ticker-data", errorHOC(getTickerData));
router.get("/p2p-trades", errorHOC(getP2PTrades));

router.post(
  "/historical-klines",
  verifyjwt,
  formValidate(historicalKlinesSchema),
  errorHOC(getHistoricalKlines)
);

module.exports = router;
