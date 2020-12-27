import { IServerResponse,  ISearchProduct, IProduct } from "../../../../domain/interfaces"

export interface ISearchProductsUseCase {
   
    searchProducts(search: ISearchProduct, page: number, token?:string): Promise<IServerResponse<Array<IProduct>>>
}