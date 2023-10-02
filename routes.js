const express = require("express");
const Router = express.Router();

const authCtrl = require("./controllers/authCtrl");
const userCtrl = require("./controllers/userCtrl");
const postCtrl = require("./controllers/postCtrl");

// Auth
Router.route("/signup").post(authCtrl.signUp);
Router.route("/signin").post(authCtrl.signIn);
Router.route("/signout").post(authCtrl.isLoggedIn, authCtrl.signOut);

// Profile
Router.route("/profile").get(authCtrl.isLoggedIn, userCtrl.getMe);

// Post
Router.route("/post")
  .post(authCtrl.isLoggedIn)
  .get(authCtrl.isLoggedIn, postCtrl.getPosts);
Router.route("/post/:post_id").get(authCtrl.isLoggedIn, postCtrl.getPosts);

Router.all("*", (req, res, next) => {
  res.status(404).json({
    status: "error",
    result: "Not Found",
  });
});
module.exports = Router;