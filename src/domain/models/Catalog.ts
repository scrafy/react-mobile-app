import { ICatalog } from "../interfaces/ICatalog";


export class Catalog implements ICatalog{
    
    id!: number;
    name!: string;
    totalProducts!: number;
    primaryCode!: string;
    sellerId!: number;
    sellerName!: string;
    imageUrl?: string | undefined;

    
}