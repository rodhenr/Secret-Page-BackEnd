const jwt = require("jsonwebtoken");
require("dotenv").config();

const atualizarToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", { hhtpOnly: true, sameSite: "None", secure: true });

  jwt.verify(refreshToken, process.env.KEY_REFRESH_TOKEN, (err, decoded) => {
    if (err)
      return res.status(406).send({ mensagem: "Refresh Token expirado" });

    const { username } = decoded;
    const accessToken = jwt.sign({ username }, process.env.KEY_TOKEN, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign({ username }, process.env.KEY_REFRESH_TOKEN, {
      expiresIn: "15m",
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  });
};

module.exports = { atualizarToken };
