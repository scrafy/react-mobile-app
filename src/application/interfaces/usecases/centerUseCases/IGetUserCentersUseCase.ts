import { IServerResponse, ICenter } from "../../../../domain/interfaces"

export interface IGetUserCentersUseCase {

    getUserCenters(): Promise<IServerResponse<Array<ICenter>>>
}