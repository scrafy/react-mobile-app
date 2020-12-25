import { IServerResponse,  IOrder } from "../../../../domain/interfaces"

export interface IGetOrderTotalSummaryUseCase {

    getOrderTotalsSummary(order: IOrder): Promise<IServerResponse<IOrder>>
}