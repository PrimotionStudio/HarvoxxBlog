const express = require("express");
const Router = express.Router();

const authCtrl = require("./../controllers/authCtrl");
Router.route("/signup").post(authCtrl.signUp);
Router.route("/signin").post(authCtrl.signIn);

Router.route("/profile").get();
Router.route("/post").post();
module.exports = Router;
