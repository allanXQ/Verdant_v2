const router = require("express").Router();
const addAsset = require("../../controllers/ZAdmin/assets/addAsset");
const { verifyjwt } = require("../../middleware/verifyjwt");
const formValidate = require("../../middleware/validate");
const { addAssetSchema } = require("../../yupschemas");

router.post("/add-asset", formValidate(addAssetSchema), addAsset);

module.exports = router;
