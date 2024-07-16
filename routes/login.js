const user = require("../controller/login");
const express = require("express");
const app = express();
const route = express.Router();
const Middleware = require('../middleware/login')
route.get("/userDetail", user.getUserByEmail, (req, res) => {
  res.status(200).send({ message: req.msg });
});

route.post("/login", Middleware.userLogin, (req, res) => {
  res.status(200).send({ message: req.msg });
});

route.post("/signup", Middleware.userSignUp, (req, res) => {
  res.status(200).send({ message: req.msg });
});

route.get("/tasks", Middleware.getTasks, (req, res) => {
  res.status(200).send({ message: req.msg });
});

route.post("/createTask", Middleware.newTask, (req, res) => {
  res.status(200).send({ message: req.msg });
});

route.put("/updateTask", Middleware.updateTask, (req, res) => {
  res.status(200).send({ message: req.updatedTask });
});

route.delete("/deleteTask", Middleware.deleteTask, (req, res) => {
  res.status(200).send({ message: req.msg });
});
module.exports = route