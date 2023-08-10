const router = require("express").Router();
const addStock = require("../../controllers/ZAdmin/stocks/addStock");
const { verifyjwt } = require("../../middleware/verifyjwt");
const formValidate = require("../../middleware/validate");
const { addStockSchema } = require("../../yupschemas");

router.post("/add-stock", formValidate(addStockSchema), addStock);

module.exports = router;
