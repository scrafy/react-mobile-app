import { ICatalogRepository, IHttpClient } from "../interfaces";
import { IServerResponse, ICatalog } from "../../domain/interfaces";
import { BaseRepository } from "./BaseRepository";


export class CatalogRepository extends BaseRepository implements ICatalogRepository {

    private readonly httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        super();
        this.httpClient = httpClient;
    }


    async getCenterCatalogs(centerId: number): Promise<IServerResponse<Array<ICatalog>>> {

        try {
            
            const resp = await this.httpClient.getJsonResponse(`${process.env.REACT_APP_ENDPOINT_URL}/Centres/${centerId}/catalogs`, null, true);
            return resp.data;
        }
        catch (error) {
            
            if (error.response === undefined)
                throw error;

            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

}