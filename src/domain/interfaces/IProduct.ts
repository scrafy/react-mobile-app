import Format from "../enums/Format";
import {Decimal} from "decimal.js-light"
import TaxType from "../enums/TaxType";
import { IProductAmountByDay } from "./IProductAmountByDay";



export interface IProduct {

    id: number,
    sellerId: number,
    ean?: string,
    eanUnit?: string,
    productSKU: string,
    totalTaxes: Decimal,
    totalBase: Decimal,
    total: Decimal,
    rate: Decimal,
    amount: number,
    tax: TaxType,
    taxId?: number,
    price: Decimal,
    name: string,
    favorite: boolean,
    category: string,
    imageUrl?: string,
    catalogId: number,
    sellerName: string,
    format: Format,
    amountsByDay?: Array<IProductAmountByDay>
}

