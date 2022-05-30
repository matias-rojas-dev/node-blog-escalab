const User = require("../models/user");

exports.bloggerCheck = async (req, res, next) => {
  const {_id} = req.user;

  const bloggerUser = await User.findById({_id}).exec();

  if(bloggerUser.role === 'blogger') {
    return next();
  } else {
    res.status(404).json({
      success: false,
      msg: "You are not an blogger and dont have permission to do this"
    })
  }
}


exports.validateCreateUser = (req, res, next) => {
  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    res.status(400).json({
      success: false,
      errors,
    });

    return;
  }

  next();
};



