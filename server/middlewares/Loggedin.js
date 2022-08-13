const jwt = require("jsonwebtoken");
const { JWT_token } = require("../impKeys");
const mongoose = require("mongoose");
require("../models/Signup");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Log in first 1!" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_token, (e, payload) => {
    if (e) {
      return res.status(401).json({ message: "Log in first 2!" });
    }
    const { _id } = payload;
    User.findById(_id).then((userData) => {
      req.user = userData;
      next();
    });
  });
};
