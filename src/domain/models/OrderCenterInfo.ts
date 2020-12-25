import { IOrderCenterInfo } from "../interfaces/IOrderCenterInfo";


export class OrderCenterInfo implements IOrderCenterInfo {

    centerId!: number;
    buyerId!: number;
    centerName!: string;
    imageUrl?: string | undefined;

}