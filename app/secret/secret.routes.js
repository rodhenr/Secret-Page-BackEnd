const express = require("express");
const router = express.Router();
const verificarToken = require("../auth/verificarToken.middleware");
const { secret } = require("./secret.controller");

router.get("/secret", verificarToken, secret);

module.exports = router;
