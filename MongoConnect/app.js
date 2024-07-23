const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://rudragoudaspatil1298:rudra5913@cluster0.0dz5kxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected");
  });

const User = mongoose.model("UsersList", {
  email: String,
  password: String,
  username: String,
});

const user = new User({
  email: "rudra@gmail.com",
  password: "123",
  username: "rudar",
});
console.log(user);
user.save();
