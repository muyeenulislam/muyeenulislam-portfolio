const app = require('./app');
// const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

const dotenv = require('dotenv').config({
  path: path.resolve(__dirname, './config.env'),
});

// define database
const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log('successful'));

// start the server
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}..`);
});

// unhandled rejections
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// for sigterm(terminates program)
process.on('SIGTERM', () => {
  console.log('Sigterm received, Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});
