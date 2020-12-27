import { IServerResponse, ICategory } from "../../../../domain/interfaces"

export interface IGetCategoriesUseCase {

    getCategories(catalogId: number, centreId: number, token?:string): Promise<IServerResponse<ICategory[]>>
}