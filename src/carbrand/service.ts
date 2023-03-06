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
        return carBrandModel.findByIdAndUpdate({_id:item._id},{
            brand:item.brand,
            model:item.model,
            countries:item.countries,
            status:item.status},{new: true});
    }

    async delete(_id:string) {
        return carBrandModel.findByIdAndDelete({_id:_id});
    }
}
