const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const helmet = require('helmet');
const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRoutes');
const sanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();

// middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set security http headers
app.use(helmet());

// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// serve static files
app.use(express.static(`${__dirname}/public`));

// data sanitization agaisnt noSQL
app.use(sanitize());

// data sanitization against
app.use(xss());

// prevent parameter pollution
app.use(hpp());

// routes

// mount routers
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/users', userRouter);

// if url not found
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
