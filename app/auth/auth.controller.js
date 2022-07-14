const User = require("../user/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const register = async (req, res) => {
  const { email, password, username } = req.body;
  
  if (!email || !password || !username)
    return res.status(200).send({ mensagem: "Informações faltando!" });

  try {
    const duplicatedUser = await User.findOne({
      $or: [{ email }, { email }],
    });

    if (duplicatedUser)
      return res.status(200).send({ mensagem: "Usuário já cadastrado" });

    const passwordHashed = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: passwordHashed,
      email,
    });

    res.status(200).send({ mensagem: "Usuário cadastrado com sucesso" });
  } catch (err) {
    res.status(500).send({ mensagem: "Ocorreu um problema no servidor..." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(200).send({ mensagem: "Informações faltando!" });

  try {
    const user = await User.findOne({
      email,
    });

    if (!user)
      return res.status(401).send({ mensagem: "Credenciais inválidas" });

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck)
      return res.status(401).send({ mensagem: "Credenciais inválidas" });

    const username = user.username;

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

    res.json({ accessToken });
  } catch (err) {
    res.status(500).send({ mensagem: "Ocorreu um problema no servidor..." });
  }
};

module.exports = { login, register };
