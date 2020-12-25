import { IServerResponse, ICatalog } from "../../../../domain/interfaces"

export interface IGetCenterCatalogsUseCase{
    
    getCenterCatalogs(centerId: number): Promise<IServerResponse<Array<ICatalog>>>
}