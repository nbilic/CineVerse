const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: Date,
      required: true,
    },
    originalPost: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply", replySchema);
