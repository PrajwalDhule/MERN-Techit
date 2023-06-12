const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const Loggedin = require("../middlewares/Loggedin");
require("../models/post");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get("/user/:id", Loggedin, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found" });
    });
});

router.put("/follow", Loggedin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

router.put("/unfollow", Loggedin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

router.put("/updatepic", Loggedin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { pic: req.body.pic } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: "couldn't post the picture" });
      }
      res.json(result);
    }
  );
});

router.put("/position", Loggedin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { position: req.body.position } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: "couldn't update position" });
      }
      // console.log("back result: ", result);
      res.json(result);
    }
  );
});

router.put("/bio", Loggedin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { bio: req.body.bio } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: "couldn't update bio" });
      }
      res.json(result);
    }
  );
});

module.exports = router;
