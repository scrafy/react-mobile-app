import Currency from "../enums/Currency";
import Decimal from "decimal.js-light";
import { IOrder, IOrderCenterInfo, IOrderSellerInfo, IProduct } from "../interfaces";
import { OrderCenterInfo } from "./OrderCenterInfo";
import { OrderSellerInfo } from "./OrderSellerInfo";


export class Order implements IOrder {

    id: number;
    center: IOrderCenterInfo;
    seller: IOrderSellerInfo;
    catalogId!: number;
    currency!: Currency;
    primaryCode?: string | undefined;
    userId!: string;
    createdAt!: Date;
    deliveryDate!: Date;
    totalBase: Decimal
    totalTaxes: Decimal
    totalProducts: number;
    total: Decimal
    products!: Array<IProduct>

    constructor() {

        this.id = 0;
        this.center = new OrderCenterInfo();
        this.seller = new OrderSellerInfo();
        this.catalogId = 0;
        this.currency = Currency.EUR;
        this.products = new Array<IProduct>();
        this.total = new Decimal("0.0");
        this.totalBase = new Decimal("0.0");
        this.totalTaxes = new Decimal("0.0");
        this.totalProducts = 0;
    }

}