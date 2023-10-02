const session = require("express-session");

exports.getMe = async (req, res, next) => {
  return res.status(200).json({
    status: "success",
    result: session.user,
  });
};
