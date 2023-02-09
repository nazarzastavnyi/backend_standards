import joi from 'joi';
import { DeviceEnum } from './enums';

const deviceSchema = joi.object({
    _id: joi.string(),
    platform: joi.string().valid(DeviceEnum.Android, DeviceEnum.Default, DeviceEnum.Ios, DeviceEnum.Web),
    device_id: joi.string().required(),
    fcm_token: joi.string().allow(''),
    ya_device_id: joi.string().allow(''),
    brand: joi.string().allow(''),
    model: joi.string().allow(''),
    os_version: joi.string().allow(''),
    app_version: joi.string().allow(''),
    device_lang: joi.string().allow(''),
    app_lang: joi.string().allow(''),
    active: joi.boolean(),
    location: joi.string().allow(''),
});

export { deviceSchema };
