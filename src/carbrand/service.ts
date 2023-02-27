import carBrandModel from './models';
import {CarBrand} from './intarfaces';

export class CarBrandService {
    async get(id: string) {
        return carBrandModel.findById(id);
    }

    async getList() {
        return carBrandModel.find();
    }

    async create(item:CarBrand) {
        return carBrandModel.create(item);
    }

    async update(item:CarBrand) {
        return carBrandModel.updateOne(item);
    }

    async delete(id:string) {
        return carBrandModel.deleteOne({id});
    }
}
