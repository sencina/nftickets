import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

/**
 * Middleware for validating request body against a DTO class
 * @param dtoClass The DTO class to validate against
 */
export function validateBody(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Transform plain object to class instance
    const dtoInstance = plainToClass(dtoClass, req.body);

    // Validate
    const errors = await validate(dtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      // Format validation errors
      const formattedErrors = errors.map((error) => {
        const constraints = error.constraints;
        return {
          property: error.property,
          constraints: constraints ? Object.values(constraints) : ['Invalid value'],
        };
      });

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }

    // Validation passed
    req.body = dtoInstance;
    next();
  };
}
