import { ICatalog } from "../../../domain/interfaces";
import { IServerResponse } from "../../../domain/interfaces";

export interface ICatalogRepository {

    getCenterCatalogs(centerId: number): Promise<IServerResponse<Array<ICatalog>>>
}