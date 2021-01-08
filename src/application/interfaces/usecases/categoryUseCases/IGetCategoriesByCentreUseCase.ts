import { IServerResponse, ICategory } from "../../../../domain/interfaces"

export interface IGetCategoriesByCentreUseCase {

    getCategoriesByCentre(centreId: number, token?: string): Promise<IServerResponse<ICategory[]>>
}