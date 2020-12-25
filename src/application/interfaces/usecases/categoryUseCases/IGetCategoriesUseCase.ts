import { IServerResponse, ICategory } from "../../../../domain/interfaces"

export interface IGetCategoriesUseCase {

    getCategories(catalogId: number, centreId: number): Promise<IServerResponse<ICategory[]>>
}