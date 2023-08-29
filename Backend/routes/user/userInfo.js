const router = require("express").Router();
const { verifyjwt } = require("../../middleware/verifyjwt");
const formValidate = require("../../middleware/validate");
const userInfo = require("../../controllers/account/userInfo");

router.post(
  "/user-info",
  //   verifyjwt,
  //   formValidate(),
  userInfo
);

module.exports = router;
