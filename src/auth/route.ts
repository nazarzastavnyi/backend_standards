import express from 'express';
import { security } from '../shared/security';
import { appRoute } from '../shared/route';
import { validator } from '../shared/validator';
import { authSchema, loginSchema } from './validation';

import { AuthController } from './controller';

const router = express.Router();

const authController = new AuthController();

router.post(appRoute.getMap().auth.signup, validator(authSchema), authController.registerRider);
router.post(appRoute.getMap().auth.login, validator(loginSchema), authController.login);
router.post(appRoute.getMap().auth.logout, security.validateAuthenticatedRequest, authController.logout);

export default router;
