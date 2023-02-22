import {CarBrandService} from './service';
import { NextFunction, Request, Response } from 'express';

export class CarBrandController {
    #service: CarBrandService;
    constructor() {
        this.#service = new CarBrandService();
    }

    create = async(request: Request, response: Response) => {
        const carBrand = await this.#service.create(request.body);
        response.json(carBrand);
    };
    getList = async(request: Request, response: Response) => {
        const carBrands = await this.#service.getList();
        response.json(carBrands);
    };
    get = async(request: Request, response: Response,next: NextFunction) => {
        const carBrand = await this.#service.get(request.params.id);
        if (!carBrand) {
            return next(new Error());
        }

        response.json(carBrand);
    };
    update = async(request: Request, response: Response) => {
        const carBrand = await this.#service.update(request.body);
        response.json(carBrand);
    };
    delete = async(request: Request, response: Response) => {
        const result = await this.#service.delete(request.params.id);
        response.json(result);
    };
}
