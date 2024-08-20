const { Router } = require("express");
const { User, Course } = require("../db");
const { userMiddleware } = require("../middleware/user");

const router = Router();

router.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    User.create({
      username,
      password,
    });
    res.json({
      message: "User Created",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/courses", async (req, res) => {
  const courses = await Course.find({});
  res.json({
    courses,
  });
});

router.post("/courses/:course_id", userMiddleware, async (req, res) => {
  const username = req.headers.username;
  const courseId = req.params.course_id;
  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );
  res.json({
    message: "Course Purchased",
  });
});

router.get("/purchasedcourses", userMiddleware, async (req, res) => {
  const user = await User.findOne({ username: req.headers.username });
  console.log(user.purchasedCourses);
  const purchased = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.json({
    purchasedCourses: purchased,
  });
});

module.exports = router;
