const express = require("express");
const UserModel = require("./models").User;
const EmailModel = require("./models").Email;
const PostModel = require("./models").Post;
const CommentModel = require("./models").Comment;
const UseruModel = require("./models").User_u;
const RoleModel = require("./models").Role;
const UserRoleModel = require("./models").UserRole;
require('dotenv').config()

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  UserModel.findAll({
    include: {
      model: EmailModel,
    },
  }).then((data) => {
    res.status(200).json({
      status: 1,
      data: data,
    });
  });
});

app.get("/emails", (req, res) => {
  EmailModel.findAll({
    include: {
      model: UserModel,
    },
  }).then((data) => {
    res.status(200).json({
      status: 1,
      data: data,
    });
  });
});

app.get("/posts", (req, res) => {
  PostModel.findAll({
    include: {
      model: CommentModel,
    },
  }).then((data) => {
    res.status(200).json({
      status: 1,
      data: data,
    });
  });
});

app.get("/comments", (req, res) => {
  CommentModel.findAll({
    include: {
      model: PostModel,
    },
  }).then((data) => {
    res.status(200).json({
      status: 1,
      data: data,
    });
  });
});

app.get("/usersu", (req, res) => {
  UseruModel.findAll({
    include: {
      model: RoleModel,
      attributes: ["id", "name"],
      through: {
        model: UserRoleModel,
      },
    },
  }).then((data) => {
    res.status(200).json({
      status: 1,
      data: data,
    });
  });
});

app.get("/roles", (req, res) => {
  UseruModel.findAll({
    include: {
      model: RoleModel,
      attributes: ["id", "name"],
      through: {
        model: UserRoleModel,
      },
    },
  }).then((data) => {
    res.status(200).json({
      status: 1,
      data: data,
    });
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: 1,
    message: "Welcom!!!",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at port: http://localhost:${PORT}`);
});
