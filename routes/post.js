const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const Loggedin = require("../middlewares/Loggedin");
require("../models/post");
require("../models/Signup");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get("/posts", async (req, res) => {
  try{
    const {feed, page = 1, limit = 10, userId} = req.query;
    let filter = {};

    if (feed === 'following' && userId) {
        const user = await User.findById(userId)
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        filter.postedBy = { $in: user.following };
    }

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("postedBy", "_id userName pic")
      .populate("comments.postedBy", "_id userName")
      .catch((err) => {
        console.log(err);
      });

    res.json({ posts });
  }
  catch (err) {
    console.error("Error fetching feed:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/mypost", Loggedin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id userName photo")
    .populate("comments.postedBy", "_id userName")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/posts/:postid", (req, res) => {
  Post.find({ _id: req.params.postid })
    .populate("postedBy", "_id userName pic")
    .populate("comments.postedBy", "_id pic userName")
    .select("-password")
    .then((currentPost) => {
      // console.log(currentPost);
      res.json({ currentPost });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/userposts/:userid", (req, res) => {
  Post.find({ postedBy: req.params.userid })
    .populate("postedBy", "_id userName pic")
    .populate("comments.postedBy", "_id pic userName")
    .select("-password")
    .then((userPosts) => {
      // console.log(currentPost);
      res.json({ userPosts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createpost", Loggedin, (req, res) => {
  //   console.log(req.body.name);
  const { title, desc, pic, link1, link2 } = req.body;
  if (!title || !desc || !pic) {
    return res.status(422).json({
      error: "Please add all the fields! 1",
      title: `${title} ${desc}`,
    });
  }
  //   console.log(req.user);
  req.user.password = undefined;
  const post = new Post({
    title,
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

router.put("/editpost/:postId", Loggedin, (req, res) => {
  Post.findByIdAndUpdate(
    req.params.postId,
    {
      $set: {
        title: req.body.title,
        category: req.body.category,
        desc: req.body.desc,
        photo: req.body.pic,
        link1: req.body.link1,
        link2: req.body.link2,
      },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      console.log("post edited!");
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
