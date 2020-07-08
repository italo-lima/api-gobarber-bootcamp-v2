import { Segments, Joi, celebrate } from 'celebrate';

export const sessionUser = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
