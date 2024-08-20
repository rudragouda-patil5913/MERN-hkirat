const express = require("express");
const adminRouter = require("./routers/admin");
const userRouter = require("./routers/user");

const app = express();

app.use(express.json());
app.use("/admin", adminRouter);
app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Server Running Successfully");
});
