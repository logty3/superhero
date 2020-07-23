const express = require("express");
const router = express.Router();

const heroCtrl = require("../controllers/hero.controller");

router.post("/setHeroStats", heroCtrl.setHeroStats);
router.get("/getHeroStats", heroCtrl.getHeroStats);

router.post("/uploadHeroImage", heroCtrl.uploadHeroImage);

router.get("/getHeroImage", heroCtrl.getHeroImage);

module.exports = router;
