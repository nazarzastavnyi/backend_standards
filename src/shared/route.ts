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
                list: '/deviceList',
                update: '/device/update',
                deviceById: '/device/:id'
            },
            carBrand:{
                carBrand: '/carBrand/',
                list: '/carBrandList',
                update: '/carBrand/update',
                carBrandById: '/carBrand/:id'
            }
        };
    }
}
