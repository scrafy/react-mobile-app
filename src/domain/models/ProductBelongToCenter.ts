import Decimal from "decimal.js-light";
import { IProductBelongToCenter } from "../interfaces/IProductBelongToCenter";


export class ProductBelongToCenter implements IProductBelongToCenter {
    
    price!: Decimal;
    productId!: number;
    centerId!: number;

}