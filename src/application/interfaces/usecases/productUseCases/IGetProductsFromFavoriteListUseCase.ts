import { IProduct, IServerResponse } from "../../../../domain/interfaces"

export interface IGetProductsFromFavoriteListUseCase {

    getProductsFromFavoriteList(centerId:number): Promise<IServerResponse<Array<IProduct>>>
}