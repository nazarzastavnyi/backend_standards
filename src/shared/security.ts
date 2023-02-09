import jwt from 'jsonwebtoken';
import riderModel from '../auth/models';
import { ResponseError } from './defs';

function validateTokenAndGetPayload(token: string): any {
    const secret = process.env.JWT_SECRET;
    let response: any;

    jwt.verify(token, secret, (error, data) => {
        if (error) throw error;
        response = data;
    });

    return response;
}

function retractRequestToken(request: any): string {
    let token = '';

    if (request.headers['authorization']) {
        const auth = request.headers['authorization'];
        const elements = auth.split(' ');
        if (elements.length === 2 && elements[0].toLowerCase() === 'bearer') {
            token = elements[1];
        }
        else {
            throw Error('incorrect authentication type');
        }
    }
    else {
        throw Error('not authenticated');
    }

    return token;
}

function processValidateAuthenticatedRequest(errorCode: number, request: any, response: any, next: any) {
    request.params.email = undefined;

    try {
        const token = retractRequestToken(request);
        const payload = validateTokenAndGetPayload(token);
        request.params.email = payload.email;

        riderModel.findOne({ email: payload.email }).then(rider => {

            if (rider.token !== token) {
                return next(new ResponseError(401, 'Not auth'));
            }

            next();
        });

    } catch (error) {
        response.status(errorCode);
        response.json({ error: error.message });

    }
}

export namespace security {
    export function validateAuthenticatedRequest(request: any, response: any, next: any) {
        processValidateAuthenticatedRequest(401, request, response, next);
    }

    export function generateSpecificToken(payload: any, expiration: string): string {
        const secret = process.env.JWT_SECRET;
    
        return jwt.sign(payload, secret, { expiresIn:  expiration }); 
    }
 }
