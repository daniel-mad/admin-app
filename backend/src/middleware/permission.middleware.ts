import { NextFunction, Request, Response } from 'express';
import { Permission } from '../entity/permission.entity';

export const PermissionMiddleware =
  (access: string) => (req: Request, res: Response, next: NextFunction) => {
    const user = req['user'];
    const permissions: Array<any> = user.role.permissions;

    if (req.method === 'GET') {
      if (!permissions.some(p => p.name === `view_${access}`)) {
        return res.status(401).send({
          message: 'unauthorized',
        });
      }
    } else {
      if (!permissions.some(p => p.name === `edit_${access}`)) {
        return res.status(401).send({
          message: 'unauthorized',
        });
      }
    }

    next();
  };
