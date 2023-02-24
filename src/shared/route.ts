import { ResponseError } from './defs';
import { Response } from 'express';

export namespace appRoute {
    export function getMap() {
        return {
            auth: {
                signup: '/auth/signup',
                login: '/auth/login',
                logout: '/auth/logout'
            },
            device: {
                device: '/device/',
                list: '/deviceList',
                update: '/device/update',
                deviceById: '/device/:id'
            }
        };
    }
}

export function prepareJsonResponse(response: Response, data: any, err?: ResponseError) {
    prepareResponse(response, data, () => {
        response.json(data);
    }, err);
}

function prepareResponse(response: any, data: any, responseSender: () => void, err?: ResponseError) {
    if (err) {
        response.status(err.status);
        if (err.error) {
            response.json({ data: { error: err.message, original: err.error.name, stack: err.error.stack }, success: false});
        } else {
            response.json({ data: { error: err.message }, success: false});
        }
    } else {
        response.status(200);
        response.send({ data, success: true});
    }
}
