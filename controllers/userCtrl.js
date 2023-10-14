const session = require("express-session");
const user = require("./../models/User");



exports.getMe = async (req, res, next) => {
  return res.status(200).json({
    status: "success",
    result: session.user,
  });
  
};

exports.updateProfile = async (req, res, next) => {
  let {fullname, bio, email, skill} = req.body;
  console.log(fullname, skill, bio, email)
  let client = await user.findOneAndUpdate({_id:session.user.id},
    {
      name: fullname,
      bio: bio,
      email: email,
      skill: skill,
    })
    .then( (doc)=>{
      
        console.log(doc.name+" profile update")
        session.user=doc;
        res.redirect("home");
      
    })
}