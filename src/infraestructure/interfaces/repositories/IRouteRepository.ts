import { IServerResponse } from "../../../domain/interfaces";


export interface IRouteRepository {

    getCenterDeliveryDays(centerId: number, month: number, year: number): Promise<IServerResponse<Array<Date>>>
}
