const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 1,
      max: 20,
      required: true,
    },
    lastName: {
      type: String,
      min: 1,
      max: 20,
      required: true,
    },
    handle: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg",
    },
    banner: {
      type: String,
    },
    bio: {
      type: String,
      default: "",
    },
    location: {
      type: String,
    },
    link: {
      type: String,
    },
    posts: {
      type: [String],
      default: [],
    },
    replies: {
      type: [String],
      default: [],
    },
    friends: {
      type: [String],
      default: [],
    },
    incomingRequests: {
      type: [String],
      default: [],
    },
    outgoingRequests: {
      type: [String],
      default: [],
    },
    movies: {
      type: [String],
      default: [],
    },
    moviesFollowed: {
      type: [String],
      default: [],
    },
    dob: {
      type: Date,
    },
    favoriteMovie: String,
    favoriteGenres: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
