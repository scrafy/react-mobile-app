import { IServerResponse,  ISearchProduct, IProduct } from "../../../../domain/interfaces"

export interface ISearchSubsetProductsUseCase {
   
    searchSubsetProducts(search: ISearchProduct, page: number): Promise<IServerResponse<Array<IProduct>>>
}