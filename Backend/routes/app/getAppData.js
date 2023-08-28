const router = require("express").Router();
const { verifyjwt } = require("../../middleware/verifyjwt");
const getAppData = require("../../controllers/app/getAppData");

router.get("/appData", verifyjwt, getAppData);

module.exports = router;
