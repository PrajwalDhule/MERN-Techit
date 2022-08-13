const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const Loggedin = require("../middlewares/Loggedin");
require("../models/post");
const Post = mongoose.model("Post");

router.get("/allpost", (req, res) => {
  Post.find()
    .populate("postedBy", "_id userName photo")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
  // .populate("comments.postedBy", "_id userName photo")
  // .sort("-createdAt")
});

router.post("/createpost", Loggedin, (req, res) => {
  //   console.log(req.body.name);
  const {
    title,
    category,
    desc,
    pic,
    // link1Name,
    // link1,
    // link2Name,
    // link2,
    // link3Name,
    // link3,
  } = req.body;
  if (!title || !category || !desc || !pic) {
    return res.status(422).json({
      error: "Please add all the fields! 1",
      title: `${title} ${desc}`,
    });
  }
  //   console.log(req.user);
  req.user.password = undefined;
  const post = new Post({
    title,
    category,
    desc,
    photo: pic,
    // link1Name,
    // link1,
    // link2Name,
    // link2,
    // link3Name,
    // link3,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((e) => {
      console.log(e);
    });
});

router.get("/mypost", (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("PostedBy", "_id userName photo")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
