const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const userMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  const word = token.split(" ");
  const jwtToken = word[1];
  const decoded = jwt.verify(jwtToken, JWT_SECRET);
  if (decoded.username) {
    req.username = decoded.username;
    next();
  } else {
    res.json({
      message: "Admin doesn't exist",
    });
  }
};

module.exports = { userMiddleware };
