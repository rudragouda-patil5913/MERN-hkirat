const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

const sum = (n) => {
  let res = 0;
  for (let i = 1; i <= n; i++) {
    res += i;
  }
  return res;
};

app.get("/sum", (req, res) => {
  const count = req.query.count;
  const ans = sum(count);
  res.json({ ans });
});

app.post("/health-checkup", (req, res) => {
  const username = req.headers.username;
  const password = req.headers.pass;
  const kidney = req.query.kidney;
  console.log(kidney);
  if (username !== "rudra" || password !== "pass") {
    res.status(403).json({
      message: "Invalid Credentials",
    });
    return;
  }

  if (kidney != 1 && kidney != 2) {
    res.json({
      message: "wrong inputs",
    });
    return;
  }

  res.json({
    message: "Your health is good",
  });
});

app.listen(3000, () => {
  console.log("Server running successfully");
});
