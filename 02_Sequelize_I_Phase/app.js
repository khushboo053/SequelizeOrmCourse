const express = require("express");
const bodyParser = require("body-parser");
const appRoutes = require("./routes");
require('dotenv').config()

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT;

// Create Model => Second way to create models
// User Model
/*
const Model = Sequelize.Model;

class User extends Model {}

User.init(
  {
    // parameters
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
    },
    rollNo: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.ENUM("1", "0"),
      defaultValue: "1",
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    modelName: "User",
    timestamps: false,
    // sequelize,
  }
);

// Book Model
class Book extends Model {}

Book.init(
  {
    // parameters
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    amount: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM("1", "0"),
      defaultValue: "1",
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    modelName: "Book",
    timestamps: false,
    // sequelize,
  }
);
*/

app.use("/", appRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at Port: ${PORT}`);
});