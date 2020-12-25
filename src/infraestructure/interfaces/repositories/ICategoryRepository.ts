import { ICategory } from "../../../domain/interfaces";
import { IServerResponse } from "../../../domain/interfaces";

export interface ICategoryRepository {

    getCategories(catalogId: number, centreId: number): Promise<IServerResponse<ICategory[]>>
    getCategoriesByCentre(centreId: number): Promise<IServerResponse<ICategory[]>>

}
