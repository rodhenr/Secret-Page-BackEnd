const express = require("express");
const mongoose = require("mongoose");
const routes = require("./app/auth/auth.routes");
const app = express();
const port = 8080;

app.use(routes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const url = "mongodb://localhost:27017/secretdb";
mongoose.connect(url, {
  useNewUrlParser: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro na Ligação ao MongoDB"));

app.listen(port, () => {
  console.log("Servidor iniciado...");
});

module.exports = app;
