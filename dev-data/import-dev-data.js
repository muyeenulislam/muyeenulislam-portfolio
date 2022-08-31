const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('../models/projectModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('successful'));

//   read json
const projects = JSON.parse(
  fs.readFileSync(`${__dirname}/project.json`, 'utf-8')
);

// import data in database
const importData = async () => {
  try {
    await Project.create(projects);
    console.log('data loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// delete all the data from collection
const deleteData = async () => {
  try {
    await Project.deleteMany();
    console.log('data deleted');
  } catch (err) {
    console.log(err.name);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);
