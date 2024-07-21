const express = require("express");

const PORT = "3000";

const app = express();

function sum(n) {
  let res = 0;
  for (let i = 1; i <= n; i++) {
    res = res + i;
  }
  return res;
}
function mul(n) {
  let res = 1;
  for (let i = 1; i <= n; i++) {
    res = res * i;
  }
  return res;
}

function calculate(count, cb) {
  return cb(count);
}

app.get("/", (req, res) => {
  //   res.send("Hello World!");
  const count = req.query.count;
  const sumval = calculate(count, sum);
  const mulval = calculate(count, mul);
  res.json({
    sumval,
    mulval,
  });
});

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});
