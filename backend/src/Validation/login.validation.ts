import { Joi } from 'express-validation';

export const LoginValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
