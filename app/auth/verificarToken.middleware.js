const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer"))
    return res.status(401).json({ messagem: "Nenhum token encontrado" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "umachavesecreta", (err, decoded) => {
    if (err)
      return res
        .status(403)
        .json({ messagem: "Falha na autenticação do Token", err });

    req.username = decoded.username;
    next();
  });
};

module.exports = verificarToken;
