import { Segments, Joi, celebrate } from 'celebrate';

export const createAppointment = celebrate({
  [Segments.BODY]: Joi.object({
    provider_id: Joi.string().uuid().required(),
    date: Joi.date().required(),
  }),
});
