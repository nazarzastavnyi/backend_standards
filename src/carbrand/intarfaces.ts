import {AVAILABLE_COUNTRIES} from './enums';

export interface CarBrand{
    brand:string,
    model:string,
    status:boolean,
    countries:AVAILABLE_COUNTRIES
}
