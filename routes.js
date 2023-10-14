const express = require("express");
const session = require("express-session");
const Router = express.Router();
const postCtrl = require("./controllers/postCtrl");
const authCtrl = require("./controllers/authCtrl");
const userCtrl = require("./controllers/userCtrl");
const User = require("./models/User");
const fs=require("fs");
const path=require("path");

const multer = require("multer");
// const multerupload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cd) => {
//       cd(null, "public/profiles");
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${req.userid}at${Date.now()}.jpg`);
//     },
//   }),
// });

const multerupload = multer({storage: multer.memoryStorage()})

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
  // console.log(await postCtrl.getPosts());
  res.status(200).render("index", {
    alert: alert || "",
    posts: await postCtrl.getPosts(),
    login: false,
  });
});
Router.route("/home").get(authCtrl.isLoggedIn, async (req, res, next) => {
  let alert;
  if (session.alert) {
    alert = session.alert;
    session.alert = undefined;
  }
  res.status(200).render("index", {
    alert: alert || "",
    posts: await postCtrl.getPosts(),
    login: true,
  });
});
Router.route("/profile").get(authCtrl.isLoggedIn, async (req, res, next) => {
  let alert;
  if (session.alert) {
    alert = session.alert;
    session.alert = undefined;
  }
  res.status(200).render("profile", {
    alert: alert || "",
    user: session.user,
    login: (session.user != undefined),
  });
})
.post(authCtrl.isLoggedIn, userCtrl.updateProfile);
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



// Update Profile Pic
Router.post(
  "/profilepic",
  multerupload.single("photo"),
  async (req,res)=>{
    let me=await User.findById(session.user.id);
    let {buffer, mimetype} = req.file;
    me.photo={
      data: buffer,
      contentType: mimetype,
    }
     me.save()
     .then(()=>{
      console.log(`${session.user.name} updated their profile pic`)
    })
     res.status(200).json({
      status: "success",
      result: `${session.user.name} updated their profile pic`,
    })
  }
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
  .get(authCtrl.isLoggedIn, postCtrl.getPosts, (req, res) =>{
    res.redirect("/home");
  });

Router.route("/post/:post_id").get( async (req, res, next) => {
   post= await postCtrl.getPost(req.params.post_id);
    posts= await postCtrl.getPostsByAuthor(post.author);
  res.status(200).render("post", {
    alert: session.alert || "",
    post: post,
    posts: posts,
    login: (session.user != undefined),
  });
});

Router.route("/like/:post").get(postCtrl.likePost, (req, res)=>{
  console.log("done")
  res.send("Done")
});

Router.route("/dislike/:post").get(postCtrl.dislikePost, (req, res)=>{
  console.log("finally")
  res.send("Done")
})

Router.all("*", (req, res, next) => {
  res.status(404).json({
    status: "error",
    result: "Not Found",
  });
});
module.exports = Router;
