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
      data: {type: Buffer,
            default: Buffer.from(",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"
              , "base64")
          },
      contentType: {
              type:String,
              default:"image/jpeg"
      }
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

// UserSchema.virtual("image").get(function(){
  
//     let str=",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";
//     this.photo.data=Buffer.from(str, "base64")
//     this.photo.contentType="image/jpeg";
//     // this.save()
  
//   let src= `data:${this.photo.contentType}; base64, ${this.photo.data.toString('base64')}`;
//   return src;
// });

UserSchema.virtual("image").get(function(){
  
  let src="";
  if(this.photo.data!=undefined){
    src= `data:${this.photo.contentType}; base64, ${this.photo.data.toString('base64')}`;
  }
  else{
    let str=",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";
    let data=Buffer.from(str, "base64")
    let contentType="image/jpeg";
    src= `data:${contentType}; base64, ${data.toString('base64')}`;
    
  }
  
  return src;
  
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
