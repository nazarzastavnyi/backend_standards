import { Request, Response, NextFunction } from 'express';
import { ResponseError } from './defs';

export function validator (validation: any) {

    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            const validated = await validation.validateAsync(req.body);
            req.body = validated;
            next();
        } catch (err) {
            if (err.isJoi) return next(new ResponseError(400, err.message));
            next(new Error('Internal error'));
        }
    };
}
