const express = require("express");
const router = express.Router();
const { login, register } = require("../auth/auth.controller");
const { atualizarToken } = require("./refreshToken.controller");

router.post("/auth/login", login);
router.post("/auth/register", register);
router.get("/auth/refresh", atualizarToken);

module.exports = router;
