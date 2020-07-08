import { Router } from 'express';

import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

import {
  forgotPassword,
  resetPassword,
} from '@modules/users/infra/http/validations/password';

const passwordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot', forgotPassword, forgotPasswordController.create);
passwordRoutes.post('/reset', resetPassword, resetPasswordController.create);

export default passwordRoutes;
