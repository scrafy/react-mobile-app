import { IServerResponse,  IOrder } from "../../../../domain/interfaces"

export interface IGetOrdersDoneUseCase {

    getOrdersDone(): Promise<IServerResponse<Array<IOrder>>>

}