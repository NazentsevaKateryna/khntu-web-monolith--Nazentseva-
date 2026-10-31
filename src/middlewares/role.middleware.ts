import { Request, Response, NextFunction } from 'express';

export const roleGuard = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Недостатньо прав для виконання цієї операції',
      });
    }

    next();
  };
};
