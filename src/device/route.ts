import express from 'express';
import { security } from '../shared/security';
import { appRoute } from '../shared/route';
import { validator } from '../shared/validator';
import { deviceSchema } from './validation';

import { DeviceController } from './controller';

const router = express.Router();

const deviceController = new DeviceController();

router.get(appRoute.getMap().device.deviceById, security.validateAuthenticatedRequest, deviceController.get);
router.get(appRoute.getMap().device.list, security.validateAuthenticatedRequest, deviceController.getList);
router.post(appRoute.getMap().device.device, security.validateAuthenticatedRequest, validator(deviceSchema), deviceController.create);
router.put(appRoute.getMap().device.device, security.validateAuthenticatedRequest, validator(deviceSchema), deviceController.update);
router.delete(appRoute.getMap().device.deviceById, security.validateAuthenticatedRequest, deviceController.delete);

export default router;
