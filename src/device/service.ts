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
        return deviceModel.findByIdAndUpdate({_id:item._id},{
            platform: item.platform,
            device_id: item.device_id,
            fcm_token: item.fcm_token,
            ya_device_id: item.ya_device_id,
            brand: item.brand,
            model: item.model,
            os_version: item.os_version,
            app_version: item.app_version,
            device_lang: item.device_lang,
            app_lang: item.app_lang,
            active: item.active,
            location: item.location},{new: true});
    }

    async delete(_id: string) {
        return deviceModel.findByIdAndDelete({_id:_id});
    }
}
