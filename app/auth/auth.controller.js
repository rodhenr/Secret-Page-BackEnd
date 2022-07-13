const User = require("../user/UserModel");

const getInfo = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Ocorreu um problema no servidor...");
  }
};

module.exports = { getInfo };
