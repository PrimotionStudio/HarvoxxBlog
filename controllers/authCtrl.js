const session = require("express-session");
const User = require("./../models/User");

exports.signUp = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(201).json({
      status: "success",
      result: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      result: error.stack,
    });
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        status: "error",
        result: "Invalid email or password",
      });
    }
    const isMatch = user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        result: "Invalid email or password",
      });
    }
    session.user = user;
    return res.status(200).json({
      status: "success",
      result: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      result: error.stack,
    });
  }
};

exports.isLoggedIn = async (req, res, next) => {
  if (!session.user) {
    return res.status(401).json({
      status: "error",
      result: "You are not logged in",
    });
  }
  const user = await User.findOne({ email: session.email });
  if (!user) {
    return res.status(401).json({
      status: "error",
      result: "You are not logged in",
    });
  }
  return next();
};
