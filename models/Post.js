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
    photo: {
      contentType: String,
      data: Buffer
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

PostSchema.virtual("image").get(function(){
  if(this.photo.data!=undefined){
    let src= `data:${this.photo.contentType}; base64, ${this.photo.data.toString('base64')}`;
    return src;
  }
  else{
    return undefined;
  }
});

module.exports = mongoose.model("Post", PostSchema);

