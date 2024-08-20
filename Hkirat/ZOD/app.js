const express = require("express");
const z = require("zod");

const app = express();

app.use(express.json());

const UserSchema = z.object({
  name: z.string(),
  pass: z.string().length(5),
});

app.post("/user", (req, res) => {
  const user = req.body.username;
  const password = req.body.password;
  const response = UserSchema.safeParse({
    name: user,
    pass: password,
  });
  console.log(response);
  if (response.success) {
    res.json({
      message: "Valid",
    });
  } else {
    res.json({
      message: "Invalid",
      errors: response.error.errors,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
