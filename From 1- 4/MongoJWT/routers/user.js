const { Router } = require("express");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { userMiddleware } = require("../middlewares/user");

const router = Router();

router.post("/signup", async (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;
  await User.create({
    username,
    password,
  });
  res.json({
    message: "User created",
  });
});

router.post("/signin", async (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;

  const user = await User.find({
    username,
    password,
  });

  if (user) {
    const token = jwt.sign({ username }, JWT_SECRET);
    res.json({
      token
    });
  } else {
    res.json({
      message: "User not Found",
    });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const course = req.params.courseId;
  const username = req.username;
  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: course,
      },
    }
  );
  res.json({
    message: "Course Purchased",
  });
});

router.get("/purchasedcourses", userMiddleware, async (req, res) => {
  const username = req.username;
  const user = await User.findOne({ username });
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.json({
    purchasedCourses: courses,
  });
});

module.exports = router;
