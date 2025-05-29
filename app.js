const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const { MONGOURI } = require("./config/impKeys");
const auth = require("./routes/auth");
const post = require("./routes/post");
const user = require("./routes/user");
const notice = require("./routes/notice");
require("./models/Signup");
require("./models/post");
require("./models/notice");

// match v7's default (changed from v6 where it's true)
mongoose.set('strictQuery', false);

mongoose.connect(MONGOURI).catch((e) => {
  console.error(e);
});

const customMW = (req, res, next) => {
  console.log("middleware is executed");
  next();
};

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.use(express.json());

const routes = [auth, post, user, notice];
routes.forEach((route) => app.use("/api", route));

app.use(customMW);

app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
