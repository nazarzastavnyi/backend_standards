import express from 'express';
import { security } from '../shared/security';
import { appRoute } from '../shared/route';
import { validator } from '../shared/validator';
import {carBrandSchema} from './validation';
import {CarBrandController} from './controller';

const router = express.Router();

const carBrandController = new CarBrandController();

router.get(appRoute.getMap().carBrand.carBrandById, security.validateAuthenticatedRequest, carBrandController.get);
router.get(appRoute.getMap().carBrand.list, security.validateAuthenticatedRequest, carBrandController.getList);
router.post(appRoute.getMap().carBrand.carBrand, security.validateAuthenticatedRequest, validator(carBrandSchema), carBrandController.create);
router.put(appRoute.getMap().carBrand.update, security.validateAuthenticatedRequest, validator(carBrandSchema), carBrandController.update);
router.delete(appRoute.getMap().carBrand.carBrandById, security.validateAuthenticatedRequest, carBrandController.delete);

export default router;
