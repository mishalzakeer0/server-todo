const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('ToDo', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM("pending", "in-progress", "completed"),
    defaultValue: "pending"  // Set the default value here
  },
  // created_at: {
  //   type: DataTypes.DATE,
  //   defaultValue: Sequelize.NOW
  // }
});


const User = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  } 


   
},{
  createdAt:false,
  updatedAt:false
});

const Sync = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("syncing successful");
  } catch (err) {
    console.log("error in syncing", err);
  }
};

Sync();

module.exports = {
    Task,
    User
}

