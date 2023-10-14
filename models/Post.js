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
      required: false,
      default: 0
    },
    dislikes:{
      type: Number,
      required: false,
      default: 0
    },
  },
  {
    timestamps: true,
  }
);



PostSchema.methods.like=async function(){
  this.likes+=1;
  this.save()
  .then(()=>{
    console.log(`${this.title} got a like.`)
  })
  
}

PostSchema.methods.dislike=async function(){
  this.dislikes+=1;
  this.save()
  .then(()=>{
    console.log(`${this.title} got a like.`)
  })
  
}

module.exports = mongoose.model("Post", PostSchema);

