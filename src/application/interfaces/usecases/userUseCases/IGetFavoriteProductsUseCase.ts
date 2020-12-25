import { IServerResponse,  ISearchProduct, IProduct } from "../../../../domain/interfaces"

export interface IGetFavoriteProductsUseCase{

    getFavoriteProducts( searchProduct: ISearchProduct ): Promise<IServerResponse<Array<IProduct>>>
}