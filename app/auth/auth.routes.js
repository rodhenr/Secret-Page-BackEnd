const express = require("express");
const router = express.Router();
const { login, register } = require("../auth/auth.controller");
const verificarToken = require("./verificarToken.middleware");

router.post("/auth/login", verificarToken, login);
router.post("/auth/register", register);

module.exports = router;
