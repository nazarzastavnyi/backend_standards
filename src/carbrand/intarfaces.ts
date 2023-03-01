import {AVAILABLE_COUNTRIES} from './enums';

export interface CarBrand{
    _id:string,
    brand:string,
    model:string,
    status:boolean,
    countries:AVAILABLE_COUNTRIES
}
