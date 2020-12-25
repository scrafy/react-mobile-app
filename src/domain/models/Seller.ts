import Sector from "../enums/Sector";
import { ISeller } from "../interfaces/ISeller";

export class Seller implements ISeller {

    id: number;
    gln?: number | undefined;
    companyName!: string;
    vatNumber!: string;
    address!: string;
    city!: string;
    postalCode!: string;
    country!: string;
    erp?: string | undefined;
    email!: string;
    province!: string;
    sector!: Sector;
    imageUrl: string | undefined;

    constructor() {
        this.id = 0;
    }

}