const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const Loggedin = require("../middlewares/Loggedin");
require("../models/post");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get("/allposts", Loggedin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id userName pic")
    .populate("comments.postedBy", "_id userName")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
  // .populate("comments.postedBy", "_id userName photo")
  // .sort("-createdAt")
});

router.get("/followedposts", Loggedin, (req, res) => {
  Post.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id userName photo")
    .populate("comments.postedBy", "_id userName")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createpost", Loggedin, (req, res) => {
  //   console.log(req.body.name);
  const { title, category, desc, pic, link1, link2 } = req.body;
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
    link1,
    link2,
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

router.get("/mypost", Loggedin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id userName photo")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/like", Loggedin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/unlike", Loggedin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/comment", Loggedin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id userName")
    .populate("postedBy", "_id userName")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.delete("/deletepost/:postId", Loggedin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

module.exports = router;
