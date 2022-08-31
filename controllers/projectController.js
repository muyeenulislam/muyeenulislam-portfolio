const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const factory = require('./handlerFactory');

// get all projects
exports.getAllProjects = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Project.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const projects = await features.query;

  res.status(200).json({
    status: 'success',
    result: projects.length,
    data: {
      projects,
    },
  });
});

// get project by id
exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new AppError('No project found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      project,
    },
  });
});

// create project
exports.createProject = factory.createOne(Project);

// update tour
exports.updateProject = factory.updateOne(Project);

// delete tour
exports.deleteProject = factory.deleteOne(Project);
