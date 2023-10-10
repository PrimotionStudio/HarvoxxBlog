const express = require("express");
const session = require("express-session");
const Router = express.Router();
const postCtrl = require("./controllers/postCtrl");
const authCtrl = require("./controllers/authCtrl");
const userCtrl = require("./controllers/userCtrl");
const User = require("./models/User");

const multer = require("multer");
const multerupload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cd) => {
      cd(null, "public/profiles");
    },
    filename: (req, file, cb) => {
      cb(null, `${req.userid}at${Date.now()}.jpg`);
    },
  }),
});

// Home
Router.route("/").get(async (req, res, next) => {
  if (session.user && (await User.findOne({ email: session.user.email }))) {
    return res.status(200).redirect("/home");
  }
  let alert;
  if (session.alert) {
    alert = session.alert;
    session.alert = undefined;
  }
  console.log(await postCtrl.getPosts());
  res.status(200).render("index", {
    alert: alert || "",
    posts: await postCtrl.getPosts(),
    login: false,
  });
});
Router.route("/home").get(authCtrl.isLoggedIn, (req, res, next) => {
  let alert;
  if (session.alert) {
    alert = session.alert;
    session.alert = undefined;
  }
  res.status(200).render("index", {
    alert: alert || "",
    posts: postCtrl.getPosts(),
    login: true,
  });
});

// Auth
Router.route("/signup")
  .get((req, res, next) => {
    let alert;
    if (session.alert) {
      alert = session.alert;
      session.alert = undefined;
    }
    res.status(200).render("signup", { alert: alert || "" });
  })
  .post(authCtrl.signUp);
Router.route("/signin")
  .get((req, res, next) => {
    let alert;
    if (session.alert) {
      alert = session.alert;
      session.alert = undefined;
    }
    res.status(200).render("signin", { alert: alert || "" });
  })
  .post(authCtrl.signIn);
Router.route("/signout")
  .post(authCtrl.isLoggedIn, authCtrl.signOut)
  .get(authCtrl.isLoggedIn, authCtrl.signOut);

// Profile
Router.route("/profile").get(authCtrl.isLoggedIn, userCtrl.getMe);

// Update Profile Pic
Router.post(
  "/profilepic",
  multerupload.single("photo"),
  userCtrl.uploadProfilePic
);
// Post
Router.route("/publish").get(authCtrl.isLoggedIn, (req, res, next) => {
  let alert;
  if (session.alert) {
    alert = session.alert;
    session.alert = undefined;
  }
  res.status(200).render("publish", { alert: alert || "" });
});
Router.route("/post")
  .post(authCtrl.isLoggedIn, postCtrl.createPost)
  .get(authCtrl.isLoggedIn, postCtrl.getPosts);
Router.route("/post/:post_id").get(authCtrl.isLoggedIn, postCtrl.getPosts);

Router.all("*", (req, res, next) => {
  res.status(404).json({
    status: "error",
    result: "Not Found",
  });
});
module.exports = Router;
