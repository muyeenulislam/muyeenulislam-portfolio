const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');

exports.getView = catchAsync(async (req, res, next) => {
  // 1. get project data
  const projects = await Project.find();

  res.status(200).render('base', {
    projects,
  });
});
