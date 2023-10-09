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
    likes:{
      type: Number,
      required: false
    },
    dislikes:{
      type: Number,
      required: false
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.methods.like=async function(){
  this.likes+=1;
  console.log(`${this.title} got a like.`)
  this.save();
  
}

PostSchema.methods.dislike=async function(){
  this.dislikes+=1;
  console.log(`${this.title} got a like.`)
  this.save();
  
}

module.exports = mongoose.model("Post", PostSchema);

