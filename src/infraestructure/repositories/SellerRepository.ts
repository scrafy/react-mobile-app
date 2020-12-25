import { BaseRepository } from "./BaseRepository";
import {  IHttpClient, ISellerRepository } from "../interfaces";
import { IServerResponse, ISeller } from "../../domain/interfaces";

export class SellerRepository extends BaseRepository implements ISellerRepository {

    private readonly httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        super();
        this.httpClient = httpClient;
    }

    async getSellers(): Promise<IServerResponse<Array<ISeller>>> {

        try {
            const resp = await this.httpClient.getJsonResponse(`${process.env.REACT_APP_ENDPOINT_URL}/Suppliers`, null, true);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }

    }

}