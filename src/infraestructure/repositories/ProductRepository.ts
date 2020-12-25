import { BaseRepository } from "./BaseRepository";
import { IHttpClient, IProductRepository } from "../interfaces";
import { IServerResponse, ISearchProduct, IProduct } from "../../domain/interfaces";


export class ProductRepository extends BaseRepository implements IProductRepository {

    private readonly httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        super();
        this.httpClient = httpClient;
    }


    async searchProducts(search: ISearchProduct, page: number): Promise<IServerResponse<Array<IProduct>>> {

        try {
            const resp = await this.httpClient.postJsonData(`${process.env.REACT_APP_ENDPOINT_URL}/ProductDetails/${page}/search`, search, null, true);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

    async searchSubsetProducts(search: ISearchProduct, page: number): Promise<IServerResponse<Array<IProduct>>> {

        try {
            const resp = await this.httpClient.postJsonData(`${process.env.REACT_APP_ENDPOINT_URL}/ProductDetails/${page}/subsetproducts`, search, null, true);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

    async addProductToFavoriteList(productId: number): Promise<IServerResponse<string>> {

        try {
            const resp = await this.httpClient.postNoBody(`${process.env.REACT_APP_ENDPOINT_URL}/ProductDetails/${productId}/addfavoriteproduct`, null, true);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

    async deleteProductFromFavoriteList(productId: number): Promise<IServerResponse<string>> {

        try {
            const resp = await this.httpClient.delete(`${process.env.REACT_APP_ENDPOINT_URL}/ProductDetails/${productId}/removefavoriteproduct`, null, true);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

    async getProductsFromFavoriteList(centerId:number): Promise<IServerResponse<Array<IProduct>>> {

        try {
            const resp = await this.httpClient.getJsonResponse(`${process.env.REACT_APP_ENDPOINT_URL}/ProductDetails/${centerId}/favoriteproducts`, null, true);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

}