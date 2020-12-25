import { IServerResponse,  ISearchProduct, IProduct } from "../../../../domain/interfaces"

export interface ISearchProductsUseCase {
   
    searchProducts(search: ISearchProduct, page: number): Promise<IServerResponse<Array<IProduct>>>
}