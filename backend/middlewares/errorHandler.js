// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error("Error details:", {
    message: err.message,
    stack: err.stack,
    status: err.status || 500,
  });

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Don't expose stack trace in production
  const error = process.env.NODE_ENV === 'production' ? null : err.stack;

  res.status(status).json({
    success: false,
    message,
    error,
  });
};

export default errorHandler;
