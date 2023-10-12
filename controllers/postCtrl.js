const Post = require("./../models/Post");
const session = require("express-session");
let msg = "";

exports.getPosts = async () => {
  const posts = await Post.find().populate("author").exec();
  return posts;
};

exports.getPost = async () => {
  const post = await Post.findById(req.params.post_id).populate("author").exec();
  return post;
};

exports.getPostsByTag = async (req, res, next) => {
  const posts = await Post.find({ tags: { $all: [req.body.tags] } });
  return res.status(200).json({
    status: "success",
    result: posts,
  });
};

exports.getPostsByAuthor = async (req, res, next) => {
  const post = await Post.find({ author: req.body.author });
  return post;
};

exports.get = async (req, res, next) => {
  const post = await Post.find({ author: req.body.author });
  return post;
};

exports.createPost = async (req, res, next) => {
  let post = new Post({
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags.split(","),
    author: session.user._id,
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
  let postid = req.body.post;
  let post = await Post.findById(postid);
  post.like().then(() => {
    msg = "liked";
  });
};

exports.dislikePost = async (req, res, next) => {
  let postid = req.body.post;
  let post = await Post.findById(postid);
  post.dislike().then(() => {
    msg = "disliked";
  });
};

/*
  function of posts:
  add post
  edit post
  delete post
  find post
  find posts
  find posts by author
  like post
*/
