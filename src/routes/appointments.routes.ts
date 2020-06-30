import { Router } from 'express';

const appointmentsRoutes = Router();

appointmentsRoutes.get('/', (req, res) => {
  return res.json({ ok: true });
});

export default appointmentsRoutes;
