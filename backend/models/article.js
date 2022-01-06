const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    body: {
      type: String,
      trim: true,
      required: true,
      maxlength: 5000
    },
    author: {
      type: ObjectId,
      required: true,
      ref: "User"
    },
    language: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    image: {
      data: Buffer,
      contentType: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);