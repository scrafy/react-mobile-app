import { ISearchProduct } from "../../../domain/interfaces";
import { IServerResponse } from "../../../domain/interfaces";
import { IProduct } from "../../../domain/interfaces";


export interface IProductRepository {

    searchProducts(search: ISearchProduct, page: number, recordsByPage?:number): Promise<IServerResponse<Array<IProduct>>>
    tokenSearchProducts(search: ISearchProduct, page: number, token:string, recordsByPage?:number): Promise<IServerResponse<Array<IProduct>>>
    addProductToFavoriteList(productId: number): Promise<IServerResponse<string>>
    deleteProductFromFavoriteList(productId: number): Promise<IServerResponse<string>>
    getProductsFromFavoriteList(centerId:number): Promise<IServerResponse<Array<IProduct>>>
    searchSubsetProducts(search: ISearchProduct, page: number): Promise<IServerResponse<Array<IProduct>>> 
}
