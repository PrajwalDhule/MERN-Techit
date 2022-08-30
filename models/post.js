const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  link1: {
    type: String,
  },
  link2: {
    type: String,
  },
  likes: [{ type: require("mongodb").ObjectId, ref: "User" }],
  comments: [
    {
      text: String,
      postedBy: {
        type: require("mongodb").ObjectId,
        ref: "User",
      },
    },
  ],
  postedBy: {
    type: require("mongodb").ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", postSchema);
