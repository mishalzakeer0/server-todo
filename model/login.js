const pool = require("./db_todo");

const findUserByEmail = async (email) => {
  try {
    const result = await pool.User.findOne({ where: { email: email } });
    return result;
  } catch (error) {
    console.log("failed to find user", error);
  }
};

const findUserByEmailAndPassword = async (email, password) => {
  try {
    const result = await pool.User.findOne({
      where: { email: email, password: password },
      raw: true,
    });
    
    return result;
  } catch (error) {
    console.log("failed to find user", error);
  }
};

const createUser = async (username, email, password) => {
  try {
    const result = await pool.User.create({
      username: username,
      email: email,
      password: password,
      raw: true,
    });
    return result;
  } catch (error) {
    console.log("failed to create user", error);
    return;
  }
};

const findTasks = async (user_id) => {
  try {
    const result = await pool.Task.findAll({
      where: { user_id: user_id },
      raw: true,
    });
    return result;
  } catch (error) {
    console.log("failed to find task", error);
  }
};
const findTask = async (id) => {
    try {
      const result = await pool.Task.findOne({
        where: { id: id },
        raw: true,
      });
      return result;
    } catch (error) {
      console.log("failed to find task", error);
    }
  };

const createTask = async (user_id, title, description, status, priority) => {
  try {
    const result = await pool.Task.create({
      user_id: user_id,
      title: title,
      description: description,
      status: status,
      priority: priority,
      raw: true,
    });
    return result;
  } catch (error) {
    console.log("failed to create tasks", error);
  }
};

const updateTask = async (id, title, description, status, priority) => {
  try {
    const result = await pool.Task.update(
      {
        title: title,
        description: description,
        status: status,
        priority: priority,
      },

      { where: { id: id }, raw: true }
    );
    return result;
  } catch (error) {
    console.log("failed to update tasks", error);
  }
};

const deleteTask = async (id) => {
  try {
    const result = await pool.Task.destroy({ where: { id: id }, raw: true });
    return result;
  } catch (error) {
    console.log("failed to delete tasks", error);
  }
};

module.exports = {
  findUserByEmail,
  findUserByEmailAndPassword,
  createUser,
  findTasks,
  createTask,
  updateTask,
  deleteTask,
  findTask
};
