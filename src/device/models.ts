import mongoose from 'mongoose';
import { DeviceEnum } from './enums';

const { Schema } = mongoose;

export const deviceSchema = new Schema(
    {
        platform: {
            type: String,
            enum: DeviceEnum,
            default: DeviceEnum.Default,
        },
        device_id: { // one signal.
            type: String,
            default: '',
        },
        fcm_token: { // firebase.
            type: String,
            default: '',
        },
        ya_device_id: { // used for Yassir
            type: String,
            default: '',
        },
        brand: {
            type: String,
            default: '',
        },
        model: {
            type: String,
            default: '',
        },
        os_version: {
            type: String,
            default: '',
        },
        app_version: {
            type: String,
            default: '',
        },
        device_lang: {
            type: String,
            default: '',
        },
        app_lang: {
            type: String,
            default: '',
        },
        active: {
            type: Boolean,
            default: false,
        },
        location: {
            type: { type: String },
            coordinates: [],
        },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'last_used' } },
);

export default mongoose.model('devices', deviceSchema);
