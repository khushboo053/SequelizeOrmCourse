const express = require("express");
const Sequelize = require("sequelize");
const router = express.Router();
require("dotenv").config();

// Connection with MySQL Database
// Creating instance of Sequelize
const sequelize = new Sequelize("sequelizeorm", process.env.USERNAME, process.env.PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

// Check DB Connection
sequelize
  .authenticate()
  .then(function (success) {
    console.log("Successfully Connected");
  })
  .catch(function (error) {
    console.log(error);
  });

// Create Model => First way to create models

const User = sequelize.define(
  "users",
  {
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
  }
);

// Sync Model
sequelize.sync();

// Individually Sync Model
// Book.sync();

// Create Some data to table
// CREATE USER
router.post("/user", function (req, res) {
  // console.log(req.body); return false;
  /*
  User.create({
    name: "Khushboo",
    email: "khushboo@gmail.com",
    rollNo: 273,
    status: 1,
  })
    .then(function (response) {
      res.status(200).json({
        status: 1,
        message: "User has been created successfully",
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    */

  User.create(req.body)
    .then((response) => {
      res.status(200).json({
        status: 1,
        message: "User has created successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: 0,
        message: "Error creating users",
      });
    });
});

router.post("/bulk-users", (req, res) => {
  User.bulkCreate([
    {
      name: "user1",
      email: "u1@gmail.com",
      rollNo: 1,
      status: "1",
    },
    {
      name: "user2",
      email: "u2@gmail.com",
      rollNo: 2,
      status: "0",
    },
    {
      name: "user3",
      email: "u3@gmail.com",
      rollNo: 3,
      status: "0",
    },
    {
      name: "user4",
      email: "u4@gmail.com",
      rollNo: 4,
      status: "1",
    },
  ])
    .then((response) => {
      res.status(200).json({
        status: 1,
        message: "Users created Successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: 0,
        message: "Error creating users",
      });
    });
});

// GET ALL USERS
router.get("/getusers", (req, res) => {
  User.findAll({
    where: {
      status: "1",
    },
  })
    .then((users) => {
      res.status(200).json({
        status: 1,
        message: "Users found",
        data: users,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

// UPDATE USER
router.put("/user", (req, res) => {
  User.update(
    {
      name: req.body.name,
      email: req.body.email,
      rollNo: req.body.rollNo,
      status: req.body.status,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((response) => {
      res.status(200).json({
        status: 1,
        message: "User updated successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 0,
        message: "Failed to update user",
        data: error,
      });
    });
});

// DELETE USER
router.delete("/user/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.status(200).json({
        status: 1,
        message: "User has deleted successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 0,
        message: "Failed to delete user",
        data: error,
      });
    });
});

// RAW-QUERY TO SELECT DATA
router.get("/user-raw", (req, res) => {
  sequelize
    .query("SELECT * FROM users", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((response) => {
      res.status(200).json({
        status: 1,
        message: "Users Found",
        data: response,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

// RAW-QUERY TO UPDATE DATA
router.put("/user-update-raw", (req, res) => {
  sequelize
    .query(
      `UPDATE users SET name = '${req.body.name}', email = '${req.body.email}', rollNo = '${req.body.rollNo}', status = '${req.body.status}' where id = ${req.body.id}`,
      {
        type: sequelize.QueryTypes.UPDATE,
      }
    )
    .then((response) => {
      res.status(200).json({
        status: 1,
        message: "User updated successfully",
        data: response,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

// RAW-QUERY TO DELETE DATA
router.delete("/user-delete-raw/:id", (req, res) => {
  sequelize
    .query(`DELETE FROM users WHERE id = ${req.params.id} `, {
      type: sequelize.QueryTypes.DELETE,
    })
    .then((response) => {
      res.status(200).json({
        status: 1,
        message: "User deleted successfully",
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/", function (req, res) {
  res.status(200).json({
    status: 1,
    message: "Welcome to Home Page",
  });
});

module.exports = router;
