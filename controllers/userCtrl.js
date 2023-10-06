const session = require("express-session");
const user = require("./../models/User");


exports.getMe = async (req, res, next) => {
  return res.status(200).json({
    status: "success",
    result: session.user,
  });
};

exports.uploadProfilePic = async (req, res, next) => {
  let me=await user.findById(session.user.id);
  me.photo=`${session.user.id}at${Date.now()}.jpg`
  me.save()
  .then(()=>{
    console.log(`${session.user.name} updated their profile pic`)
  })
  return res.status(200).json({
    status: "success",
    result: `${session.user.name} updated their profile pic`,
  })
}