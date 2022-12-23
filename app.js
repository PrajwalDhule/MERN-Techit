const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const { MONGOURI } = require("./config/impKeys");
const auth = require("./routes/auth");
const post = require("./routes/post");
const user = require("./routes/user");
require("./models/Signup");
require("./models/post");

mongoose.connect(MONGOURI).catch((e) => {
  console.log(e);
});

const customMW = (req, res, next) => {
  console.log("middleware is executed");
  next();
};

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.use(express.json());
app.use(auth);
app.use(post);
app.use(user);
app.use(customMW);

// app.get("/", (req, res) => {
//   console.log("home");
//   res.send("hello");
// });
// app.get("/about", (req, res) => {
//   console.log("about");
//   res.send("about page");
// });
// app.get("/signup", (req, res) => {
//   console.log("SignUp");
//   res.send("SignUp page");
// });
// app.get("/signin", (req, res) => {
//   console.log("SignIn");
//   res.send("SignIn page");
// });
// app.get("/updatepic", (req, res) => {
//   console.log("update pic");
//   res.send("update pic");
// });

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
