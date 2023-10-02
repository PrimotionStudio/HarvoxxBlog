const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.methods.moreByAuthor = async function () {
  return await PostSchema.find({ author: this.author._id });
};

module.exports = mongoose.model("Post", PostSchema);

/*
PostSchema:
author{
    name,
    photo,
    skill
},
title,
body,
tags,
*/
