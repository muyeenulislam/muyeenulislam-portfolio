const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const factory = require('./handlerFactory');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

// to verify if the file is image
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image. Please upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// upload photo
exports.uploadProjectPhoto = upload.fields([{ name: 'image', maxCount: 1 }]);

// to resize photo
exports.resizeProjectPhoto = catchAsync(async (req, res, next) => {
  if (!req.files.image) return next();

  req.body.image = `project-${Date.now()}.jpeg`;

  await sharp(req.files.image[0].buffer)
    .resize(733, 357)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/${req.body.image}`);

  next();
});

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
