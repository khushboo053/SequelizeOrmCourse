const express = require("express");

const app = express();

const PORT = 8087;

app.get("/", (req, res) => {
  res.send({
    status: 1,
    message: "GET Method",
  });
});

app.post("/", (req, res) => {
  res.send({
    status: 1,
    message: "POST Method",
  });
});

app.put("/", (req, res) => {
  res.send({
    status: 1,
    message: "PUT Method",
  });
});

app.delete("/", (req, res) => {
  res.send({
    status: 1,
    message: "DELETE Method",
  });
});

app.listen(PORT, () => {
  console.log("App is running ", PORT);
});
