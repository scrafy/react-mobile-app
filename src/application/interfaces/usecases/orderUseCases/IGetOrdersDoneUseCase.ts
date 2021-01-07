import { IServerResponse,  IOrder } from "../../../../domain/interfaces"

export interface IGetOrdersDoneUseCase {

    getOrdersDone(orderId?:number, token?: string): Promise<IServerResponse<Array<IOrder>>>

}