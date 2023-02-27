import { DeviceService } from './service';
import { NextFunction, Request, Response } from 'express';
import { prepareJsonResponse } from '../shared/route';

export class DeviceController {
    #service: DeviceService;

    constructor() {
        this.#service = new DeviceService();
    }

    create = async (request: Request, response: Response) => {
        const device = await this.#service.create(request.body);

        prepareJsonResponse(response, device);
    };

    getList = async (request: Request, response: Response) => {
        const devices = await this.#service.getList();

        prepareJsonResponse(response,devices);
    };

    get = async (request: Request, response: Response, next: NextFunction) => {
        const device = await this.#service.get(request.params.id);
        if (!device) {
            return next(new Error());
        }

        prepareJsonResponse(response, device);
    };


    update = async (request: Request, response: Response) => {
        const device = await this.#service.update(request.body);

        prepareJsonResponse(response, device);

    };

    delete = async (request: Request, response: Response) => {
        
        const result = await this.#service.delete(request.params.id);

        prepareJsonResponse(response, {success: result});

    };
}
