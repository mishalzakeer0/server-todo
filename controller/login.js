const todo_db = require("../model/login");

const getLoginDetails = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await todo_db.findUserByEmailAndPassword(email, password);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    req.msg = user
    next();
  } catch (err) {
    console.log("error in get all user", err);
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await todo_db.findUserByEmail(email);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    req.msg = user;
   
    next();
  } catch (err) {
    console.log("error in getting user", err);
  }
};

module.exports = {
  getLoginDetails,
  getUserByEmail,
};
