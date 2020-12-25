import Sector from "../enums/Sector";

export interface ISeller {

    id: number,
    gln?: number,
    companyName: string,
    vatNumber: string,
    address: string,
    city: string,
    postalCode: string,
    country: string,
    erp?: string,
    email: string,
    province: string,
    sector: Sector,
    imageUrl?: string
}