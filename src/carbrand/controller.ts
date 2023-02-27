import {CarBrandService} from './service';
import { NextFunction, Request, Response } from 'express';
import { prepareJsonResponse } from '../shared/route';

export class CarBrandController {
    #service: CarBrandService;
    constructor() {
        this.#service = new CarBrandService();
    }

    create = async(request: Request, response: Response) => {
        const carBrand = await this.#service.create(request.body);
        prepareJsonResponse(response,carBrand);
    };
    getList = async(request: Request, response: Response) => {
        const carBrands = await this.#service.getList();
        prepareJsonResponse(response,carBrands);
    };
    get = async(request: Request, response: Response,next: NextFunction) => {
        const carBrand = await this.#service.get(request.params.id);
        if (!carBrand) {
            return next(new Error());
        }

        prepareJsonResponse(response,carBrand);
    };
    update = async(request: Request, response: Response) => {
        const carBrand = await this.#service.update(request.body);
        prepareJsonResponse(response,carBrand);
    };
    delete = async(request: Request, response: Response) => {
        const result = await this.#service.delete(request.params.id);
        prepareJsonResponse(response,{success: result});
    };
}
