const mongoose = require('mongoose');
const validator = require('validator');
// schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Provide valid email'],
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    default: 'admin',
  },
});

// model
const User = mongoose.model('User', userSchema);

module.exports = User;
