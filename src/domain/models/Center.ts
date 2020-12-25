import Sector from "../enums/Sector";
import { ICenter } from "../interfaces/ICenter";

export class Center implements ICenter {

    id!: number;
    name!: string;
    address!: string;
    city!: string;
    postalCode!: number;
    country!: string;
    email!: string;
    province!: string;
    sector!: Sector;
    imageUrl?: string | undefined;
    buyerId!: number;

}