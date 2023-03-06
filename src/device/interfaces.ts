import { DeviceEnum } from './enums';

export interface Device {
    _id?:string,
    platform: DeviceEnum,
    device_id: string,
    fcm_token: string,
    ya_device_id: string,
    brand: string,
    model: string,
    os_version: string,
    app_version: string,
    device_lang: string,
    app_lang: string,
    active: boolean,
    location: string
}
