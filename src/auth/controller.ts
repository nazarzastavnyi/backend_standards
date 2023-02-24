import { NextFunction, Request, Response } from 'express';
import { AuthService } from './service';
import { ResponseError } from '../shared/defs';
import { prepareJsonResponse } from '../shared/route';

export class AuthController {
    #authService: AuthService;

    constructor() {
        this.#authService = new AuthService();
    }

    registerRider = async (request: Request, response: Response, next: NextFunction) => {
        const isExist = await this.#authService.getRiderByEmail(request.body.email);

        if (isExist) {
            return next(new ResponseError(400,'Rider exist'));
        }
        
        const newRider = await this.#authService.registerRider(request.body);

        prepareJsonResponse(response, { id: newRider._id });
    };

    login = async (request: Request, response: Response, next: NextFunction) => {
        const token = await this.#authService.login(request.body);

        if (!token) {
            return next(new ResponseError(401, 'Not auth'));
        }

        prepareJsonResponse(response, { token });
    };

    logout = async (request: Request, response: Response) => {
        const logout = await this.#authService.logout(request.params.email);

        prepareJsonResponse(response, {success: logout});
    };
}
