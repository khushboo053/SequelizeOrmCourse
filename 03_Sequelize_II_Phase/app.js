const express = require("express");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JwtConfig = require("./config/jwt-config");
const JwtMiddleware = require("./config/jwt-middleware");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());

const sequelize = new Sequelize("jwtsequelize", process.env.USERNAME, process.env.PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

sequelize
  .authenticate()
  .then((success) => {
    console.log("Database Connected Successfully ");
  })
  .catch((error) => {
    console.log(error);
  });

const User = sequelize.define("users", {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(150),
    allowNull: false,
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
});

User.sync(); // Sync model to database

// REGISTER
app.post("/user", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password, 10);
  let status = req.body.status;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (user) {
        res.status(200).json({
          status: 1,
          message: "User already exists",
        });
      } else {
        User.create({
          name: name,
          email: email,
          password: password,
          status: status,
        })
          .then((response) => {
            res.status(200).json({
              status: 1,
              message: "User has been registered successfully",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// LOGIN
app.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let userToken = JWT.sign(
            {
              email: user.email,
              id: user.id,
            },
            JwtConfig.secret,
            {
              expiresIn: JwtConfig.expiresIn, // This will be in ms, here 10 mins is the limit
              notBefore: JwtConfig.notBefore, // After 1 min we r able to use this token value
              audience: JwtConfig.audience,
              issuer: JwtConfig.issuer,
              algorithm: JwtConfig.algorithm,
            }
          );

          res.status(200).json({
            status: 1,
            message: "User logged in successfully",
            token: userToken,
          });
        } else {
          res.status(500).json({
            status: 0,
            message: "Password didn't matched",
          });
        }
      } else {
        res.status(500).json({
          status: 0,
          message: "User not exists with this email address",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// VALIDATE
app.post("/validate", (req, res) => {
  let userToken = req.headers["authorization"];

  if (userToken) {
    JWT.verify(userToken, JwtConfig.secret, (error, decoded) => {
      if (error) {
        res.status(500).json({
          status: 0,
          message: "Invalid Token",
          data: error,
        });
      } else {
        res.status(200).json({
          status: 1,
          message: "Token is valid",
          data: decoded,
        });
      }
    });
  } else {
    res.status(500).json({
      status: 0,
      message: "Please provide authentication token value",
    });
  }
});

// USER PROFILE DATA
app.post("/profile", JwtMiddleware.checkToken, (req, res) => {
  res.status(200).json({
    status: 1,
    userData: req.user,
    message: "Token value parsed",
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: 1,
    message: "Welcome to Home page",
  });
});

app.listen(PORT, () =>
  console.log(`Server listening at Port: http://localhost:${PORT}`)
);
