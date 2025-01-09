import { NextFunction, Request, Response } from 'express';

// class ErrorHandler extends Error {
//   statusCode: number;
//   message: string;

//   constructor(message: string, statusCode: number) {
//     super();
//     this.message = message;
//     this.statusCode = statusCode;
//   }
// }

// const handleError = (
//   err: ErrorHandler,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';

//   res.status(statusCode).json({
//     status: 'error',
//     statusCode,
//     message,
//   });
//   next();
// };

// export { ErrorHandler, handleError };

export class ErrorHandler extends Error {
  statusCode: number;
  message: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error middleware to handle errors throughout your application
export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Log error for debugging (optional)
  // console.error('Error:', {
  //   statusCode: err.statusCode,
  //   message: err.message,
  //   stack: err.stack,
  // });

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
