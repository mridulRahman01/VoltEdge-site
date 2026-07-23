import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  statusCode?: number;
  details?: any;
}

export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[API Error] ${req.method} ${req.path} (${statusCode}):`, message, err.details || '');

  res.status(statusCode).json({
    success: false,
    error: message,
    details: err.details || null,
    timestamp: new Date().toISOString(),
  });
}
