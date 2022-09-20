const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const signUp = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    // required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  resetToken: String,
  expireToken: Date,
  pic: {
    type: String,
    default:
      "https://res.cloudinary.com/techitcloud/image/upload/v1660983423/profile_depnam.png",
  },
  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", signUp);
