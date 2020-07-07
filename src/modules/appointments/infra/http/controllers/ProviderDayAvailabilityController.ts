import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { day, month, year } = req.body;
    const { provider_id } = req.params;

    const listProvidersDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await listProvidersDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return res.json(availability);
  }
}
