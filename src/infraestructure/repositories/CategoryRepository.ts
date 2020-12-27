import { BaseRepository } from "./BaseRepository";
import { ICategoryRepository, IHttpClient } from "../interfaces";
import { IServerResponse, ICategory } from "../../domain/interfaces";

export class CategoryRepository extends BaseRepository implements ICategoryRepository {

    private readonly httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        super();
        this.httpClient = httpClient;
    }

    async getCategoriesByCentre(centreId: number): Promise<IServerResponse<ICategory[]>> {

        try {
            const resp = await this.httpClient.getJsonResponse(`${process.env.REACT_APP_ENDPOINT_URL}/Category/${centreId}/categoriesbycentre`, null, true);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

    async getCategories(catalogId: number, centreId: number): Promise<IServerResponse<ICategory[]>> {

        try {
            const resp = await this.httpClient.getJsonResponse(`${process.env.REACT_APP_ENDPOINT_URL}/Category/${catalogId}/${centreId}/Categories`, null, true);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

    async tokenGetCategories(catalogId: number, centreId: number, token: string): Promise<IServerResponse<ICategory[]>> {

        try {
            const resp = await this.httpClient.tokenGetJsonResponse(`${process.env.REACT_APP_ENDPOINT_URL}/Category/${catalogId}/${centreId}/Categories`, null, token);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

}