import Format from "../enums/Format";
import TaxType from "../enums/TaxType";
import Decimal from "decimal.js-light";
import { IProduct, IProductAmountByDay } from "../interfaces";




export class Product implements IProduct {
    id!: number;
    sellerId!: number;
    ean?: string | undefined;
    eanUnit?: string | undefined;
    productSKU!: string;
    totalTaxes: Decimal = new Decimal("0.0");
    totalBase: Decimal = new Decimal("0.0");
    total: Decimal = new Decimal("0.0");
    rate: Decimal = new Decimal("0.0");
    amount: number = 0
    tax!: TaxType;
    taxId?: number;
    price: Decimal = new Decimal("0.0");
    name!: string;
    favorite: boolean = false;
    category!: string;
    imageUrl?: string | undefined;
    catalogId!: number;
    sellerName!: string;
    format!: Format;
    amountsByDay?: Array<IProductAmountByDay>;
   
    

}