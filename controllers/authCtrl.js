const User = require("./../models/User");

exports.createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      status: "success",
      result: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      result: error.stack,
    });
  }
};

exports.signIn = async (req, req, next) => {
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
    res.status(200).json({
      status: "success",
      result: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      result: error.stack,
    });
  }
};
