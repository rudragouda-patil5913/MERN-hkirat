const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { Admin, Course } = require("../db");
const { adminMiddleware } = require("../middlewares/admin");

const router = Router();

router.post("/signup", async (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;

  await Admin.create({ username, password });

  res.json({
    message: "Admin created successfully",
  });
});

router.post("/signin", async (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;
  const isValidAdmin = await Admin.find({ username, password });
  if (isValidAdmin) {
    const token = jwt.sign({ username }, JWT_SECRET);
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Please Create account",
    });
  }
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
