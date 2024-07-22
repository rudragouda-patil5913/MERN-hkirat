const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

const UserArray = [
  {
    username: "rudra@gmail.com",
    password: "123",
    name: "Rudragouda Patil",
  },
  {
    username: "raj@gmail.com",
    password: "1223",
    name: "rajgouda Birje",
  },
  {
    username: "honda@gmail.com",
    password: "1123",
    name: "hondagouda Patil",
  },
];

function UserExist(username, password) {
  //   for (let i = 0; i < UserArray.length; i++) {
  //     if (
  //       UserArray[i].username == username &&
  //       UserArray[i].password == password
  //     ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }

  const user = UserArray.find((ele) => {
    return ele.username == username && ele.password == password;
  });
  console.log(user);
  return user;
}

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!UserExist(username, password)) {
    return res.json({
      message: "User doesn't exist",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", (req, res) => {
    let token = req.headers.authorization;
    try {
        let decoded = jwt.verify(token,jwtPassword);
        let username = decoded.username;
        return res.json({
            users: UserArray.filter((ele)=>{
                return ele.username !== username;
            })
        })
    } catch (error) {
        return res.status(403).json({
            wrongInput: "Token expired or sign in again"
        })     
    }
});

app.listen(3000, () => {
  console.log("Server Running");
});
