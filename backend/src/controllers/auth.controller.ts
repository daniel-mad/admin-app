import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { User } from '../entity/user.entity';
import { RegisterValidation } from '../Validation/register.validation';
import bcrypt from 'bcryptjs';
import { LoginValidation } from '../Validation/login.validation';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

export const Register = async (req: Request, res: Response) => {
  const body = req.body;
  const { error } = RegisterValidation.validate(body);
  if (error) res.status(400).send(error.details);
  if (body.password !== body.password_confirm)
    return res.status(400).send({ message: "Password's did not match" });

  const repository = getManager().getRepository(User);
  const { password, ...user } = await repository.save({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: await bcrypt.hash(body.password, 10),
  });
  res.status(200).send(user);
};

export const Login = async (req: Request, res: Response) => {
  const { error } = LoginValidation.validate(req.body);
  if (error) {
    return res.status(400).send(error.details);
  }
  const repository = getManager().getRepository(User);

  const user = await repository.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send({ message: 'Invalid credentials!' });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).send({ message: 'Invalid credentials!' });
  }

  const token = sign({ id: user.id }, process.env.SECRET_KEY);

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.send({
    message: 'success',
  });
};

export const AuthenticatedUser = async (req: Request, res: Response) => {
  res.send(req['user']);
};

export const Logout = async (req: Request, res: Response) => {
  res.cookie('jwt', '', { maxAge: 0 });
  res.send({ message: 'success' });
};

export const UpdateInfo = async (req: Request, res: Response) => {
  const user = req['user'];

  const repository = getManager().getRepository(User);

  await repository.update(user.id, req.body);

  const { password, ...data } = await repository.findOne(user.id);

  res.send(data);
};

export const UpdatePassword = async (req: Request, res: Response) => {
  if (req.body.password !== req.body.password_confirm)
    return res.status(400).send({ message: "Password's did not match" });
  const user = req['user'];

  const repository = getManager().getRepository(User);
  await repository.update(user.id, {
    password: await bcrypt.hash(req.body.password, 10),
  });

  const { password, ...data } = user;

  res.send(data);
};
