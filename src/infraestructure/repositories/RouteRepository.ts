import { BaseRepository } from "./BaseRepository";
import { IHttpClient, IRouteRepository } from "../interfaces";
import { IServerResponse } from "../../domain/interfaces";



export class RouteRepository extends BaseRepository implements IRouteRepository {

    private readonly httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        super();
        this.httpClient = httpClient;
    }

    async getCenterDeliveryDays(centerId: number, month: number, year: number): Promise<IServerResponse<Date[]>> {

        try {

            const resp = await this.httpClient.getJsonResponse(`${process.env.REACT_APP_ENDPOINT_URL}/Path/getdeliveryorderdays/${centerId}/${month}/${year}`, null, true);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }
}