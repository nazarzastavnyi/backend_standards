import joi from 'joi';
import {AVAILABLE_COUNTRIES} from './enums';

const carBrandSchema = joi.object({
    _id: joi.string(),
    brand: joi.string().allow(''),
    model: joi.string().allow(''),
    status: joi.boolean(),
    countries: joi.array().items(joi.string().valid(...Object.values(AVAILABLE_COUNTRIES)))
});

export { carBrandSchema };
