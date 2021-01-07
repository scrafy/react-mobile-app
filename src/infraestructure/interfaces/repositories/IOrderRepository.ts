import { IOrder } from "../../../domain/interfaces";
import { IServerResponse } from "../../../domain/interfaces";


export interface IOrderRepository {

     confirmOrder(order: IOrder): Promise<IServerResponse<string>>
     getOrdersDone(orderId?: number, token?: string): Promise<IServerResponse<Array<IOrder>>>
     getOrderTotalsSummary(order: IOrder): Promise<IServerResponse<IOrder>>
} 