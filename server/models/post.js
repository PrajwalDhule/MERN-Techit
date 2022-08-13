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
  link1Name: {
    type: String,
  },
  link1: {
    type: String,
  },
  link2Name: {
    type: String,
  },
  link2: {
    type: String,
  },
  link3Name: {
    type: String,
  },
  link3: {
    type: String,
  },
  postedBy: {
    type: require("mongodb").ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", postSchema);
