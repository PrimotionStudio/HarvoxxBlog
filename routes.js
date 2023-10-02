const express = require("express");
const Router = express.Router();

const authCtrl = require("./controllers/authCtrl");
const userCtrl = require("./controllers/userCtrl");
const postCtrl = require("./controllers/postCtrl");
Router.route("/signup").post(authCtrl.signUp);
Router.route("/signin").post(authCtrl.signIn);

Router.route("/profile").get(userCtrl.getMe);
Router.route("/post").post().get(postCtrl.getPosts);
Router.route("/post/:post_id").get(postCtrl.getPosts);
module.exports = Router;
