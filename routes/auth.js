const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_token } = require("../config/impKeys");
// const Loggedin = require("../middlewares/Loggedin");
require("../models/Signup");
const User = mongoose.model("User");

router.post("/signup", (req, res) => {
  const { userName, email, password, pic } = req.body;
  if (!userName || !email || !password) {
    return res.status(422).json({ error: "Please add all the fields!" });
  }
  User.findOne({ userName: userName })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "User already exists" });
      }
      //hashing the password to hide sensitive info
      bcrypt.hash(password, 11).then((hashedPass) => {
        const user = new User({
          userName,
          email,
          password: hashedPass,
          pic,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "Registration successfull" });
          })
          .catch((e) => {
            console.log(e);
          });
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post("/signin", (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(422).json({
      error: "Please add all the fields!",
    });
  }
  User.findOne({ userName: userName })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid information" });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((matches) => {
          if (matches) {
            // res.json({ message: `Signed in with ${userName}` });
            const token = jwt.sign({ _id: savedUser._id }, JWT_token);
            const {
              _id,
              userName,
              email,
              position,
              bio,
              followers,
              following,
              pic,
            } = savedUser;
            res.json({
              token,
              user: {
                _id,
                userName,
                email,
                position,
                bio,
                followers,
                following,
                pic,
              },
            });
          } else {
            return res.status(422).json({
              error: "Invalid information",
              dbPassword: `${savedUser.password}`,
              password: `${password}`,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });

      //   bcrypt
      //     .hash(password, 11)
      //     .then((hashedPass) => {
      //       if (hashedPass == savedUser.password) {
      //         const token = jwt.sign(
      //           {
      //             _id: savedUser._id,
      //           },
      //           JWT_token
      //         );
      //         return res.json({ token });
      //       } else {
      //         return res.status(422).json({
      //           message: "Invalid information",
      //           dbPassword: `${savedUser.password}`,
      //           password: hashedPass,
      //         });
      //       }
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //     });
      // })
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
