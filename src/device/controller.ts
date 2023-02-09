import { DeviceService } from './service';
import { NextFunction, Request, Response } from 'express';

export class DeviceController {
    #service: DeviceService;

    constructor() {
        this.#service = new DeviceService();
    }

    create = async (request: Request, response: Response) => {
        const device = await this.#service.create(request.body);

        response.json(device);
    };

    getList = async (request: Request, response: Response) => {
        const devices = await this.#service.getList();

        response.json(devices);
    };

    get = async (request: Request, response: Response, next: NextFunction) => {
        const device = await this.#service.get(request.params.id);
        if(!device) {
            return next(new Error());
        }

        response.json(device);
    };


    update = async (request: Request, response: Response) => {
        const device = await this.#service.update(request.body);

        response.json(device);

    };

    delete = async (request: Request, response: Response) => {
        
        const result = await this.#service.delete(request.params.id);

        response.json({success: result});

    };
}
