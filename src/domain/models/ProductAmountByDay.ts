import { IProductAmountByDay } from "../interfaces/IProductAmountByDay";


export class ProductAmountByDay implements IProductAmountByDay{
    day!: Date;
    amount!: number;

}