const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const Loggedin = require("../middlewares/Loggedin");
require("../models/notice");
const Notice = mongoose.model("Notice");

router.post("/createnotice", Loggedin, (req, res) => {
  //   console.log(req.body.name);
  const { desc, tags, links } = req.body;
  if (!desc || !tags || !links) {
    return res.status(422).json({
      error: "Please add all the fields! 1",
      title: `${desc}`,
    });
  }
  //   console.log(req.user);
  req.user.password = undefined;
  const notice = new Notice({
    desc,
    tags,
    links,
    postedBy: req.user,
  });
  notice
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((e) => {
      console.log(e);
    });
});

router.get("/allnotices", Loggedin, (req, res) => {
  Notice.find()
    .populate("postedBy", "_id userName pic")
    .populate("comments.postedBy", "_id userName")
    .then((notices) => {
      res.json({ notices });
    })
    .catch((err) => {
      console.log(err);
    });
  // .sort("-createdAt");
  // .populate("comments.postedBy", "_id userName photo")
});

router.get("/usernotices/:userid", Loggedin, (req, res) => {
  Notice.find({ postedBy: req.params.userid })
    .populate("postedBy", "_id userName pic")
    .populate("comments.postedBy", "_id userName")
    .then((notices) => {
      res.json({ notices });
    })
    .catch((err) => {
      console.log(err);
    });
  // .sort("-createdAt");
  // .populate("comments.postedBy", "_id userName photo")
});

module.exports = router;
