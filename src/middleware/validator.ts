import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { errorResponse } from '../utils/response';

interface ValidationOptions {
  body?: ZodSchema<any>;
  params?: ZodSchema<any>;
  query?: ZodSchema<any>;
}

export const validate = (options: ValidationOptions) => (req: Request, res: Response, next: NextFunction) => {
  try {
    if (options.body) {
      req.body = options.body.parse(req.body);
    }
    if (options.params) {
      req.params = options.params.parse(req.params);
    }
    if (options.query) {
      req.query = options.query.parse(req.query);
    }
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.errors.map(err => 
        `${err.path.join('.')} ${err.message.toLowerCase()}`
      );

      const message = `Validation error: ${messages.join(', ')}`;

      return res.status(400).json(errorResponse(message));
    }
    next(error);
  }
};
