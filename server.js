const express = require("express");
const mongoose = require("mongoose");
const routesAuth = require("./app/auth/auth.routes");
const routesSecret = require("./app/secret/secret.routes");

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routesAuth);
app.use(routesSecret);

const url = "mongodb://localhost:27017/secretdb";
mongoose.connect(url, {
  useNewUrlParser: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro na conexão com o MongoDB"));

app.listen(port, () => {
  console.log("Servidor iniciado...");
});

module.exports = app;
