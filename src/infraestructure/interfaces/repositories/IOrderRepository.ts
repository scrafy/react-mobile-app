import { IOrder } from "../../../domain/interfaces";
import { IServerResponse } from "../../../domain/interfaces";


export interface IOrderRepository {

     confirmOrder(order: IOrder): Promise<IServerResponse<string>>
     getOrdersDone(): Promise<IServerResponse<Array<IOrder>>>
     getOrderTotalsSummary(order: IOrder): Promise<IServerResponse<IOrder>>
} 