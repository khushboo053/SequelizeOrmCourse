const express = require("express");

const app = express();

const PORT = 8087;

app.get("/", (req, res) => {
  res.send({
    status: 1,
    message: "Welcome to Home page",
  });
});

app.get("/about", (req, res) => {
  res.send({
    status: 1,
    message: "Welcome to About page",
  });
});

app.get("/services", (req, res) => {
  res.send({
    status: 1,
    message: "Welcome to Services page",
  });
});

app.get("/contact", (req, res) => {
  res.send({
    status: 1,
    message: "Welcome to Contact page",
  });
});

app.listen(PORT, () => {
  console.log("Server listening at port ", PORT);
});