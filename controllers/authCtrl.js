const session = require("express-session");
const User = require("./../models/User");

exports.signUp = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    session.alert = "SignUp Successful";
    return res.status(201).redirect("signin");
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .render("error", { error: "An error occured while signing up" });
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .render("signin", { alert: "Invalid email or password" });
    }
    const isMatch = user.comparePassword(req.body.password);
    if (!isMatch) {
      return res
        .status(401)
        .render("signin", { alert: "Invalid email or password" });
    }
    session.user = user;
    return res.status(200).redirect("home");
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .render("error", { error: "An error occured while signing up" });
  }
};

exports.isLoggedIn = async (req, res, next) => {
  if (!session.user) {
    return res.status(200).redirect("/");
  }
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res.status(200).redirect("/");
  }
  return next();
};

exports.signOut = (req, res, next) => {
  session.user = undefined;
  return res.status(200).redirect("/");
};
