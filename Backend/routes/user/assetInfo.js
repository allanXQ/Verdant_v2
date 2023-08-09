const router = require("express").Router();
const { verifyjwt } = require("../../middleware/verifyjwt");
const getHistoricalKlines = require("../../controllers/account/Assetinfo/getHistoricalKlines");
const getStocks = require("../../controllers/account/Assetinfo/stocks");

router.get("/historical-klines", verifyjwt, getHistoricalKlines);
router.get("/stocks", verifyjwt, getStocks);

module.exports = router;
