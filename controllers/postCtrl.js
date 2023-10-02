const Post = require("./../models/Post");

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
