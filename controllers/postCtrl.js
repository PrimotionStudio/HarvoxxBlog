const Post = require("./../models/Post");
const session = require("express-session");
let msg = "";

exports.getPosts = async () => {
  const posts = await Post.find().populate("author").exec();
  return posts;
};

exports.getPost = async (postid) => {
  const post = await Post.findById(postid).populate("author").exec();
  console.log("fetching post");
  return post;
};

exports.getPostsByTag = async (req) => {
  const posts = await Post.find({ tags: { $all: tags } })
    .populate("author")
    .exec();
  return res.status(200).json({
    status: "success",
    result: posts,
  });
};

exports.getPostsByAuthor = async (id) => {
  const posts = await Post.find({ author: id }).populate("author").exec();
  return posts;
};

exports.get = async (req, res, next) => {
  const post = await Post.find({ author: req.body.author });
  return post;
};

exports.createPost = async (req, res, next) => {
  console.log(req.body)
  let {buffer, mimetype} = req.file;
  let post = new Post({
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags.split(","),
    author: session.user._id,
    photo:{
      data: buffer || null,
      contentType: mimetype || null,
    },
  });

  post
    .save()
    .then(() => {
      session.alert = "Post Published";
      return res.status(201).redirect("/");
    })
    .catch((error) => {
      console.log(error.stack);
      return res
        .status(500)
        .render("error", { error: "An error occured while signing up" });
    });
};

exports.deletePost = async (req, res, next) => {
  let author = req.params.id;
  let id = req.body.id;
  let post = await Post.findOne({ _id: id });
  if (post.author._id == author) {
    Post.deleteOne({ _id: post.id }).then(() => {
      console.log(`Deleted post with following id: ${id}`);
      msg = "Deleted";
    });
  }
  return res.status(200).json({
    status: "success",
    result: msg,
  });
};

exports.editPost = async (req, res, next) => {
  let author = req.params.id;
  let id = req.body.id;
  let post = await Post.findOne({ _id: id });
  let body = req.body.body == undefined ? post.body : req.body.body;
  let title = req.body.title == undefined ? post.title : req.body.title;
  if (post.author._id == author) {
    post.title = title;
    post.body = body;
    post.save().then(() => {
      console.log(`Edited post with following id: ${id}`);
      msg = "Edited";
    });
  }
  return res.status(200).json({
    status: "success",
    result: msg,
  });
};

exports.likePost = async (req, res, next) => {
  let postid = req.params.post;
  let post = await Post.findById(postid);
  post.like();
  msg = "liked";

  console.log(msg);
  next();
};

exports.dislikePost = async (req, res, next) => {
  let postid = req.params.post;
  let post = await Post.findById(postid);
  post.dislike();
  msg = "disliked";

  console.log(msg);
  next();
};

/*
  function of posts:
  add post
  edit post
  delete post
  find post
  find posts
  find posts by author
  like/dislike post
*/
