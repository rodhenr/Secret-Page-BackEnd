const secret = (req, res) => {
  res.status(200).send("Hello world");
};

module.exports = { secret };
