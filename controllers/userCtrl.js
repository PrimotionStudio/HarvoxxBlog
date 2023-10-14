const session = require("express-session");
const user = require("./../models/User");



exports.getMe = async (req, res, next) => {
  return res.status(200).json({
    status: "success",
    result: session.user,
  });
  
};

exports.uploadProfilePic = async (req, res, next) => {

}