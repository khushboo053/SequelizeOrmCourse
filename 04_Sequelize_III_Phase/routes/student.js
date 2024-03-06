const express = require("express");
const studentModel = require("../models").Student;
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const JwtConfig = require("../config/jwt-config");
const JwtMiddleware = require("../config/jwt--middleware");

const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const router = express.Router();

// REGISTER STUDENT
router.post("/student", (req, res) => {
  studentModel
    .findOne({
      where: {
        email: {
          [Op.eq]: req.body.email,
        },
      },
    })
    .then((user) => {
      if (user) {
        res.status(500).json({
          status: 0,
          message: "Student already exists with this email address",
        });
      } else {
        studentModel
          .create({
            name: req.body.name,
            email: req.body.email,
            rollNo: req.body.rollNo,
            password: bcrypt.hashSync(req.body.password, 10),
          })
          .then((user) => {
            res.status(200).json({
              status: 1,
              message: "Student created successfully",
            });
          })
          .catch((data) => {
            // res.status(500).json({
            //   data: data
            // });
            console.log(data);
          });
      }
    });
});

// LOGIN
router.post("/login", (req, res) => {
  studentModel
    .findOne({
      where: {
        email: {
          [Op.eq]: req.body.email,
        },
      },
    })
    .then((student) => {
      if (student) {
        let password = req.body.password;

        if (bcrypt.compareSync(password, student.password)) {
          // GENERATE TOKEN METHOD
          let token = JWT.sign(
            {
              id: student.id,
            },
            JwtConfig.secret,
            {
              expiresIn: JwtConfig.expiresIn,
              notBefore: JwtConfig.notBefore,
            }
          );

          res.status(200).json({
            status: 1,
            message: "Logged in successfully",
            token: token,
          });
        } else {
          res.status(500).json({
            status: 0,
            message: "Password didn't match",
          });
        }
      } else {
        res.status(500).json({
          status: 0,
          message: "Student doesn't exists with this email",
        });
      }
    });
});

// PROFILE API (JWT MIDDLEWARE CONCEPT)
router.post("/profile", JwtMiddleware.checkToken, (req, res) => {
  let student_id = req.data.id;

  studentModel.findByPk(student_id).then((student) => {
    if (student) {
      res.status(200).json({
        status: 1,
        message: "Profile data",
        data: student,
      });
    }
  });
});

module.exports = router;
