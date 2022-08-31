const mongoose = require('mongoose');
const { nextTick } = require('process');
const slugify = require('slugify');

// schema
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project must have a name'],
    unique: true,
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Project must have an image'],
  },
  languages: {
    type: String,
    required: [true, 'Project must have languages'],
    trim: true,
  },
  website: {
    type: String,
    required: [true, 'Project must have website'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  slug: String,
});

// document middleware, runs before .save() and .create()
projectSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// model
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
