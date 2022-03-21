import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getManager } from 'typeorm';
import { User } from '../entity/user.entity';

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwt = req.cookies['jwt'];
    const payload: any = verify(jwt, process.env.SECRET_KEY);
    const repository = getManager().getRepository(User);
    const { password, ...user } = await repository.findOne(payload.id, {
      relations: ['role', 'role.permissions'],
    });
    req['user'] = user;
    if (!user) throw new Error('Invalid credentials');
    next();
  } catch (err) {
    return res.status(401).send({
      message: 'Unauthenticated',
      error: err.message,
    });
  }
};
