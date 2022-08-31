const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');

// create token
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //   check if email exists
  if (!email || !password) {
    return next(new AppError('Invalid email or password', 400));
  }

  // check if password is correct
  const user = await User.findOne({ email: email }).select('+password');

  if (!user || password !== user.password) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // send token
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});
