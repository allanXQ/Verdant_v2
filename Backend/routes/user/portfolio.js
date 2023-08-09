const buyLimit = require("../../controllers/account/Portfolio/buyLimit");
const createBuyOrder = require("../../controllers/account/Portfolio/createBuyOrder");
const createSellOrder = require("../../controllers/account/Portfolio/createSellOrder");
const sellLimit = require("../../controllers/account/Portfolio/sellLimit");
const tradeHistory = require("../../controllers/account/Portfolio/tradeHistory");
const formValidate = require("../../middleware/validate");
const { verifyjwt } = require("../../middleware/verifyjwt");
const { p2pOrderSchema } = require("../../yupschemas");

router.get("/trade-history/:stockname", verifyjwt, tradeHistory); //if param return all sells for that stock by user else return all sells by user
router.post(
  "sell-order",
  verifyjwt,
  formValidate(p2pOrderSchema),
  createSellOrder
);
router.post(
  "buy-order",
  verifyjwt,
  formValidate(p2pOrderSchema),
  createBuyOrder
);
router.post("sell-limit", verifyjwt, formValidate(p2pOrderSchema), sellLimit);
router.post("buy-limit", verifyjwt, formValidate(p2pOrderSchema), buyLimit);

module.exports = router;
