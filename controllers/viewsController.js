const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');
const nodemailer = require('nodemailer');

exports.getView = catchAsync(async (req, res, next) => {
  // 1. get project data
  const projects = await Project.find();

  res.status(200).render('base', {
    projects,
  });
});

exports.sendMail = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'muyeenulislamwebsite@gmail.com',
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: 'mdmuyeenulislam@gmail.com',
    subject: `Message from ${req.body.email}, ${req.body.name}`,
    text: req.body.textarea,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(400).json({
        status: 'fail',
      });
    } else {
      res.status(200).json({
        status: 'success',
      });
    }
  });
});
