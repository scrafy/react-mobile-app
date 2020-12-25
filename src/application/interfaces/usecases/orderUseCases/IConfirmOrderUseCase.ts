import { IServerResponse,  IOrder } from "../../../../domain/interfaces"

export  interface IConfirmOrderUseCase {

    confirmOrder(order: IOrder): Promise<IServerResponse<string>>
}