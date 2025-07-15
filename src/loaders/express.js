import createError from 'http-errors'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import email from '../routes/emailRoute.js'

dotenv.config()

export default (app) => {

  const allowedOrigins = process.env.ALLOW_ORIGIN.split(',')
  app.use(cors({
    origin: (origin, callback) => {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = 'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));


  app.use(morgan(':date :method :url :status :response-time ms'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use('/api', email);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });
}
