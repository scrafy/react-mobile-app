import { IServerResponse, ICategory } from "../../../../domain/interfaces"

export interface IGetCategoriesByCentreUseCase {

    getCategoriesByCentre(centreId: number): Promise<IServerResponse<ICategory[]>>
}