const express = require("express");
const router = express.Router();
const { getInfo } = require("../auth/auth.controller");

router.get("/", getInfo);

module.exports = router;
