const { Router } = require("express");
const router = Router();

const { Admin, Course } = require("../db");
const { adminMiddleware } = require("../middleware/admin");

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({
    username,
    password,
  }).then((data) => {
    res.json({
      message: "Admin Created",
    });
  });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const newCourse = await Course.create({
    title,
    description,
    price,
  });
  res.json({
    message: "New Course Created",
    course: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const response = await Course.find({});
  res.json({
    course: response,
  });
});

module.exports = router;
