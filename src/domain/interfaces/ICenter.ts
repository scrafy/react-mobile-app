import Sector from "../enums/Sector";

export interface ICenter {

    id: number,
    name: string,
    address: string,
    city: string,
    postalCode: number,
    country: string,
    email: string,
    province: string,
    sector: Sector,
    imageUrl?: string ,
    buyerId: number
}