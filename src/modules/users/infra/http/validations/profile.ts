import { Segments, Joi, celebrate } from 'celebrate';

export const updateProfile = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    old_password: Joi.string(),
    password: Joi.string(),
    password_confirmation: Joi.string().valid(Joi.ref('password')),
  }),
});
