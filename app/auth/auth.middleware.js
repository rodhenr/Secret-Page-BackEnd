const verificarRegistro = (req, res, next) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username)
    return res.status(400).send("Dados incompletos!");
  if (email === "" || password === "" || username === "")
    return res.status(400).send("Dados incompletos!");
  if (password.length < 6)
    return res.status(400).send("A senha deve conter ao menos 6 dígitos!");
  if (username.length < 3)
    return res
      .status(400)
      .send("O nome de usuário deve conter ao menos 3 dígitos!");
  next();
};

module.exports = { verificarRegistro };
