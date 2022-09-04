const path = require('path');
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
const viewRouter = require('./routes/viewRoutes');
const compression = require('compression');
const cors = require('cors');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// middleware

// cors
app.use(cors());
app.options('*', cors());

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set security http headers
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'data:', 'blob:'],

      fontSrc: ["'self'", 'https:', 'data:'],

      scriptSrc: ["'self'", 'unsafe-inline'],

      scriptSrc: ["'self'", 'https://*.cloudflare.com'],

      scriptSrcElem: ["'self'", 'https:', 'https://*.cloudflare.com'],

      styleSrc: ["'self'", 'https:', 'unsafe-inline'],

      connectSrc: ["'self'", 'data', 'https://*.cloudflare.com'],
    },
  })
);

// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// data sanitization agaisnt noSQL
app.use(sanitize());

// data sanitization against
app.use(xss());

// prevent parameter pollution
app.use(hpp());

// compression
app.use(compression());

// routes
// mount routers
app.use('/', viewRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/users', userRouter);

// if url not found
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
