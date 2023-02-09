import deviceModel from './models';
import { Device } from './interfaces';

export class DeviceService {
    async get(id: string) {
        return deviceModel.findById(id);
    }

    async getList() {
        return deviceModel.find();
    }

    async create(item: Device) {
        return deviceModel.create(item);
    }

    async update(item: Device) {
        return deviceModel.updateOne(item);
    }

    async delete(_id: string) {
        return deviceModel.deleteOne({_id});
    }
}
