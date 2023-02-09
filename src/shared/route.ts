export namespace appRoute {
    export function getMap() {
        return {
            auth: {
                signup: '/auth/signup',
                login: '/auth/login',
                logout: '/auth/logout'
            },
            device: {
                device: '/device/',
                list: '/getDeviceList',
                update: '/device/update',
                deviceById: '/device/:id'
            }
        };
    }
}
