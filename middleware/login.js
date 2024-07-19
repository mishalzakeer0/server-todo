const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const userValid = require("../model/login");
require('dotenv').config()
const express = require("express");
const app = express();
app.use(cookieParser());
app.use(express.json());

// Middleware to verify JWT token
const authToken = (req, res, next) => {
  const token = req.cookies['token'];
 
  console.log(req.cookies['token'],'token123');
  if (token == null || token == undefined) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send({ error: "Forbidden" });
    req.user = user; // Attach user data to request object

    console.log("user", req.user);
    next();
  });
};


const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Validate user credentials
    const validUser = await userValid.findUserByEmailAndPassword(email, password);
    if (!validUser) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT token for authentication
    const token = jwt.sign({ email: validUser.email }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    console.log(validUser,"validUser");
    res.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: true,
      sameSite: 'strict'
    });
    
    res.cookie('userId', validUser.id, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: true,
      sameSite: 'strict'
    });
    
    res.status(200).send({ message: "Valid User", token, validUser });
    

  } catch (err) {
    console.error("Error:--", err.message);
    res.status(401).send({ error: err.message });
  }
};

const userSignUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await userValid.createUser(username, email, password);
    if (newUser) {
      res.send({ message: "User Created" });
    }

    next();
  } catch (err) {
    console.error("Error:", err.message);
    res.status(401).send({ error: err.message });
  }
};

const getTasks = async (req, res, next) => {
  try {
    const { user_id } = req.query;
    const tasks = await userValid.findTasks(user_id);
    if (tasks) {
      res.send({ message: tasks });
    } else {
      res.status(404).send({ message: 'No tasks found' });
    }
  } catch (err) {
    console.error("Error:", err.message);
    res.status(401).send({ error: err.message });
  }
}; 

const newTask = async (req, res, next) => {
  try {
    const { user_id, title, description, status, priority } = req.body;
    const tasks = await userValid.createTask(
      user_id,
      title,
      description,
      status,
      priority
    );
    if (tasks) {
      res.send({ message: tasks });
      next();
    }
  } catch (err) {
    console.error("Error:", err.message);
    res.status(401).send({ error: err.message });
  }
};
 const updateTask = async (req, res, next) => {
   try {
    
     const {id, title, description, status, priority } = req.body;
     const msg = await userValid.updateTask(id, title, description, status, priority);
     const updatedTask = await userValid.findTask(id);

     if (msg) {
       res.send({ message: msg, updatedTask });
     } else {
       res.status(404).send({ error: "Task not found" });
     }

     next();
   } catch (err) {
     console.error("Error:", err.message);
     res.status(500).send({ error: err.message });
   }
 };

 const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.query; 
    const msg = await userValid.deleteTask(id);

    if (msg) {
      res.send({ message: msg }); 
    } else {
      res.status(404).send({ message: "Task not found" }); 
    }
    next(); 
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send({ error: err.message }); 
  }
};


module.exports = {
  authToken,
  userLogin,
  userSignUp,
  getTasks,
  newTask,
  updateTask,
  deleteTask,
};
