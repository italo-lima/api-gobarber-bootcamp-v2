import { Segments, Joi, celebrate } from 'celebrate';

export const providerAvailability = celebrate({
  [Segments.PARAMS]: Joi.object({
    provider_id: Joi.string().uuid().required(),
  }),
});
