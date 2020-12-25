import { IServerResponse } from "../../../../domain/interfaces"

export  interface IGetCenterDeliveryDaysUseCase {

    getCenterDeliveryDays(centerId:number, month:number, year:number): Promise<IServerResponse<Array<Date>>>
}