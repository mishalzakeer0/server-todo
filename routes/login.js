const user = require("../controller/login");
const express = require("express");
const app = express();
const route = express.Router();
const Middleware = require('../middleware/login')
route.get("/detail", user.getUserByEmail, (req, res) => {
  res.status(200).send({ message: req.msg });
});

route.get("/login", Middleware.userLogin, (req, res) => {
  res.status(200).send({ message: req.msg });
});

module.exports = route