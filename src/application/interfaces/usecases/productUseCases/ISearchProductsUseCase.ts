import { IServerResponse,  ISearchProduct, IProduct } from "../../../../domain/interfaces"

export interface ISearchProductsUseCase {
   
    searchProducts(search: ISearchProduct, page: number, token?:string, recordsByPage?:number): Promise<IServerResponse<Array<IProduct>>>
}