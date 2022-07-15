const express = require("express");
const router = express.Router();
const { login, register } = require("../auth/auth.controller");
const { atualizarToken } = require("./refreshToken.controller");
const { verificarRegistro } = require("./auth.middleware");

router.post("/auth/login", login);
router.post("/auth/register", verificarRegistro, register);
router.get("/auth/refresh", atualizarToken);

module.exports = router;
