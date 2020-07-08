import { Segments, Joi, celebrate } from 'celebrate';

export const createUser = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
