const express = require("express");
const mongoose = require("mongoose");
const routesAuth = require("./app/auth/auth.routes");
const routesSecret = require("./app/secret/secret.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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
