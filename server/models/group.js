const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: {
      type: [String],
      default: [],
    },
    posts: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
    picture: {
      type: String,
    },
    banner: {
      type: String,
    },
    public: {
      type: Boolean,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    admin: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
