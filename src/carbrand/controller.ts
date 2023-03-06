import {CarBrandService} from './service';
import { NextFunction, Request, Response } from 'express';
import { prepareJsonResponse } from '../shared/route';
import { ResponseError } from '../shared/defs';

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
            return next(new ResponseError(404,'Car Brand not found'));
        }

        prepareJsonResponse(response,carBrand);

    };
    update = async(request: Request, response: Response,next: NextFunction) => {
        const carBrand = await this.#service.update(request.body);
        if (!carBrand) {
            return next(new ResponseError(404,'Car Brand not found'));
        }

        prepareJsonResponse(response,carBrand);

    };
    delete = async(request: Request, response: Response,next: NextFunction) => {
        const result = await this.#service.delete(request.params.id);
        if (!result) {
            return next(new ResponseError(404,'Car Brand not found'));
        }
        prepareJsonResponse(response,{success: result});
        
    };
}
