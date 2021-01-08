import { BaseRepository } from "./BaseRepository";
import { IHttpClient, IOrderRepository } from "../interfaces";
import { IServerResponse, IOrder } from "../../domain/interfaces";


export class OrderRepository extends BaseRepository implements IOrderRepository {

    private readonly httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        super();
        this.httpClient = httpClient;
    }

    async confirmOrder(order: IOrder): Promise<IServerResponse<string>> {

        try {
            const resp = await this.httpClient.postJsonData(`${process.env.REACT_APP_ENDPOINT_URL}/Orders`, order, null, true);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

    async getOrdersDone(orderId?: number, token?: string): Promise<IServerResponse<Array<IOrder>>> {

        let resp: any;

        try {
            if (token)

                if (orderId && !isNaN(orderId))

                    resp = await this.httpClient.tokenGetJsonResponse(`${process.env.REACT_APP_ENDPOINT_URL}/Orders/OrdersDone/${orderId}`, null, token);
                else
                    resp = await this.httpClient.tokenGetJsonResponse(`${process.env.REACT_APP_ENDPOINT_URL}/Orders/OrdersDone`, null, token);
            else

                if (orderId && !isNaN(orderId))
                    resp = await this.httpClient.getJsonResponse(`${process.env.REACT_APP_ENDPOINT_URL}/Orders/OrdersDone/${orderId}`, null, true);
                else
                    resp = await this.httpClient.getJsonResponse(`${process.env.REACT_APP_ENDPOINT_URL}/Orders/OrdersDone`, null, true);

            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

    async getOrderTotalsSummary(order: IOrder): Promise<IServerResponse<IOrder>> {

        try {
            const resp = await this.httpClient.postJsonData(`${process.env.REACT_APP_ENDPOINT_URL}/Orders/OrderSummary`, order, null, true);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

}