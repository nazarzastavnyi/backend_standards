import { Device } from '../device/interfaces';

export interface Rider {
    rider: string,
    full_name?: string,
    first_name?: string,
    last_name?: string,
    email: string,
    phone?: string,
    birthday?: Date,
    genter?: string,
    rating?: number,
    devices?: Array<Device>,
    password: string
}

export interface Login {
    email: string,
    password: string
}
