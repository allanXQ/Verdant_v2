const router = require("express").Router();
const { verifyjwt } = require("@middleware/verifyjwt");
const getTickerData = require("@controllers/app");
const getHistoricalKlines = require("@controllers/app");
const formValidate = require("@middleware/validate");

const { historicalKlinesSchema } = require("@yupschemas");
const errorHOC = require("@utils/errorHOC");
const getP2PTrades = require("@controllers/app");

router.post("/ticker-data", errorHOC(getTickerData));
router.get("/p2p-trades", errorHOC(getP2PTrades));

router.post(
  "/historical-klines",
  verifyjwt,
  formValidate(historicalKlinesSchema),
  errorHOC(getHistoricalKlines)
);

module.exports = router;
