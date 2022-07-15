const secret = (req, res) => {
  res.status(200).send("A maioria das vacas não consegue descer escadas");
};

module.exports = { secret };
