import {DeviceEnum} from '../../src/device/enums';
const newDevice = {
    platform: DeviceEnum.Android,
    device_id: '1',
    fcm_token: '',
    ya_device_id: '',
    brand: '',
    model: '',
    os_version: '',
    app_version: '',
    device_lang: '',
    app_lang: '',
    active: false,
    location: ''
};
const newDevice1 = {
    _id:'1',
    platform: DeviceEnum.Web,
    device_id: '2',
    fcm_token: '',
    ya_device_id: '',
    brand: '',
    model: '',
    os_version: '',
    app_version: '',
    device_lang: '',
    app_lang: '',
    active: false,
    location: ''
};
    
export {
    newDevice,newDevice1
};
