const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  desc: {
    type: String,
  },
  tags: [{ type: String }],
  links: [{ type: String }],
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

module.exports = mongoose.model("Notice", noticeSchema);
