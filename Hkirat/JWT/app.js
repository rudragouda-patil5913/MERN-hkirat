const express = require("express");
const jwt = require("jsonwebtoken");
const jwtpassword = "12345";

const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  let username = req.body.username;
  let token = jwt.sign(username, jwtpassword);
  return res.json({
    token,
  });
});

app.get("/", (req, res) => {
  const authHeader = req.headers.authorization;

  let decoded = jwt.verify(authHeader, jwtpassword);
  return res.json({
    decoded,
  });
});

app.listen(3000, () => {
  console.log("Server connected");
});
