const Post = require("./../models/Post");

let msg="";

exports.getPosts = async (req, res, next) => {
  const posts = await Post.find();
  return res.status(200).json({
    status: "success",
    result: posts,
  });
};

exports.getPost = async (req, res, next) => {
  const post = await Post.findById(req.params.post_id);
  return res.status(200).json({
    status: "success",
    result: post,
  });
};

exports.createPost = async (req,res,next) =>{
  let post=new Post({
    body:req.body.body,
    title:req.body.title,
    tags:req.body.tags,
     author:req.params.id,
  })

  post.save()
  .then((err,doc)=>{
    if(err){
      console.log("Error occured: "+err);
      msg="Error occured: "+err
    }
    else{
      msg="posted"
    }
  })

  return res.status(200).json({
    status: "success",
    result:msg,
  })
}

exports.deletePost=async (req,res, next) =>{
  let author=req.params.id;
  let id=req.body.id
  let post=await Post.findOne({_id: id});
  if(post.author._id==author){
    Post.deleteOne({_id:post.id})
    .then(()=>{
      console.log(`Deleted post with following id: ${id}`);
      msg="Deleted";
    })
  }
   return res.status(200).json({
    status: "success",
    result:msg,
  })
}

/*
  createPost:
  get title, body, tags (from body)
  get author id(from params)
  create post
  save post
  send positive response
*/