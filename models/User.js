const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
      type: String,
      required: false,
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
const User = mongoose.model("User", UserSchema);
module.exports = User;
