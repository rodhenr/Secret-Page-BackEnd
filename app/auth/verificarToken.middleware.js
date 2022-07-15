const jwt = require("jsonwebtoken");
require("dotenv").config();

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer"))
    return res.status(401).send({ messagem: "Nenhum token encontrado" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.KEY_TOKEN, (err, decoded) => {
    if (err) return res.status(403).send("Falha na autenticação do Token");

    req.username = decoded.username;
    next();
  });
};

module.exports = verificarToken;
