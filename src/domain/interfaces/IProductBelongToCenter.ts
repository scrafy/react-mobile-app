import Decimal from "decimal.js-light";

export interface IProductBelongToCenter {

    price: Decimal,
    productId: number,
    centerId: number
}
