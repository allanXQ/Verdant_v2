const router = require("express").Router();
const { verifyjwt } = require("../../middleware/verifyjwt");
const getAppData = require("../../controllers/app/getAppData");

router.get("/general-data", getAppData);

module.exports = router;
