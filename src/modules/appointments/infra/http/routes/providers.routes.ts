import { Router } from 'express';

import verifyAuthentication from '@modules/users/infra/http/middlewares/verifyAuthentication';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';

const providersRoutes = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRoutes.use(verifyAuthentication);

providersRoutes.get('/', providersController.index);
providersRoutes.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);
providersRoutes.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);

export default providersRoutes;
