const jwt = require("jsonwebtoken");
const userValid = require("../model/login");
const express = require("express");
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to verify JWT token
const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send({ error: "Unauthorized" });
  jwt.verify(token, process.env.USER_KEY, (err, user) => {
    if (err) return res.status(403).send({ error: "Forbidden" });
    req.user = user; // Attach user data to request object

    console.log("user", req.user);
    next();
  });
};

const userLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // Validate patient credentials
      const validUser = await userValid.findUserByEmailAndPassword(
        email,
        password
      );
      if (validUser.length === 0) {
        throw new Error("Invalid credentials");
      }
      // Generate JWT token for authentication
      const token = jwt.sign(
        { email: validUser.password },
        "secretkey",
        { expiresIn: "1d" }
      );
      res
        .status(200)
        .send({ message: "Valid User", token, email, password, id });
      next();
    } catch (err) {
      console.error("Error:", err.message);
      res.status(401).send({ error: err.message });
    }
  };
  
  module.exports = {
    authToken,
    userLogin,
  };