const createSellOrder = require("../../controllers/account/Portfolio/createSellOrder");
const formValidate = require("../../middleware/validate");
const { verifyjwt } = require("../../middleware/verifyjwt");
const { p2pOrderSchema } = require("../../yupschemas");

router.get("/sells/:stockname", verifyjwt); //if param return all sells for that stock by user else return all sells by user
router.post(
  "createSellOrder",
  verifyjwt,
  formValidate(p2pOrderSchema),
  createSellOrder
);
