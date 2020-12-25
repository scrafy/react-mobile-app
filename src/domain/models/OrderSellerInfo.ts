import { IOrderSellerInfo } from "../interfaces/IOrderSellerInfo";


export class OrderSellerInfo implements IOrderSellerInfo {
    
    sellerId!: number;
    sellerName!: string | null;
   
}