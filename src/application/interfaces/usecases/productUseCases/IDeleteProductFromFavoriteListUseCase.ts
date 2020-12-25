import { IServerResponse } from "../../../../domain/interfaces"

export interface IDeleteProductFromFavoriteListUseCase {

    deleteProductFromFavoriteList(productId: number): Promise<IServerResponse<string>>
}