import { IServerResponse } from "../../../../domain/interfaces"

export interface IAddProductToFavoriteListUseCase {

    addProductToFavoriteList(productId: number): Promise<IServerResponse<string>>
}