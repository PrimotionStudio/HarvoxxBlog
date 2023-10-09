const express = require("express");
const Router = express.Router();
const postCtrl = require("./controllers/postCtrl");
const authCtrl = require("./controllers/authCtrl");
const userCtrl = require("./controllers/userCtrl");

const multer = require("multer");
const multerupload=multer({
  storage: multer.diskStorage({
    destination: (req, file, cd) => {
      cd(null, "public/profiles");
    },
    filename: (req, file, cb) => {
      
      cb(null, `${req.userid}at${Date.now()}.jpg`)
    }
  })
});

// Auth
Router.route("/signup")
  .get((req, res, next) => {
    res.status(200).render("signup");
  })
  .post(authCtrl.signUp);
Router.route("/signin")
  .get((req, res, next) => {
    res.status(200).render("signin");
  })
  .post(authCtrl.signIn);
Router.route("/signout").post(authCtrl.isLoggedIn, authCtrl.signOut);

// Profile
Router.route("/profile").get(authCtrl.isLoggedIn, userCtrl.getMe);

// Update Profile Pic
Router.post("/profilepic", multerupload.single("photo"), userCtrl.uploadProfilePic)
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
