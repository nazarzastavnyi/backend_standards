import joi from 'joi';

const generalRules = {
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().min(8).required(),
};

const authSchema = joi.object(Object.assign({
    rider: joi.string().min(5).required(),
}, generalRules));

const loginSchema = joi.object(generalRules);
export { authSchema, loginSchema };
