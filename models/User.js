const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    skill: {
      type:String,
      
      default: "Unskilled",
    },
    bio: {
      type: String,

    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String
    },
    
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.virtual("image").get(function(){
  // return `data: post.photo.contentType ; base64, <%=post.author.photo.data.toString('base64')`
 
  let src= `data:${this.photo.contentType}; base64, ${this.photo.data.toString('base64')}`
  return src
})

const User = mongoose.model("User", UserSchema);
module.exports = User;
