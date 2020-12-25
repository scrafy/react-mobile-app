import Currency from "../enums/Currency"
import Decimal from "decimal.js-light";
import { IOrderCenterInfo } from "./IOrderCenterInfo";
import { IOrderSellerInfo } from "./IOrderSellerInfo";
import { IProduct } from "./IProduct";


export interface IOrder {

    id: number
    center: IOrderCenterInfo
    seller: IOrderSellerInfo
    currency: Currency
    primaryCode?: string
    userId: string
    createdAt: Date
    deliveryDate: Date
    totalBase: Decimal
    totalTaxes: Decimal
    totalProducts: number
    total: Decimal
    products: Array<IProduct>
}