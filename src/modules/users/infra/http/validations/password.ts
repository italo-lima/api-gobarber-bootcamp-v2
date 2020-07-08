import { Segments, Joi, celebrate } from 'celebrate';

export const resetPassword = celebrate({
  [Segments.BODY]: Joi.object({
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
  }),
});

export const forgotPassword = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
  }),
});
