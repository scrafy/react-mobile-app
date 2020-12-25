import { BaseRepository } from "./BaseRepository";
import { ICenterRepository, IHttpClient, ITokenService } from "../interfaces";
import { IServerResponse, ICenter, IAccountCentreCode, IUserProfile, IProductBelongToCenter } from "../../domain/interfaces";


export  class CenterRepository extends BaseRepository implements ICenterRepository {

    private readonly httpClient: IHttpClient;
    private readonly tokenService: ITokenService;

    constructor(httpClient: IHttpClient, tokenService: ITokenService) {
        super();
        this.httpClient = httpClient;
        this.tokenService = tokenService
    }

    async checkProductBelongToCenter(data: IProductBelongToCenter): Promise<IServerResponse<string>> {

        try {
            const resp = await this.httpClient.postJsonData(`${process.env.REACT_APP_ENDPOINT_URL}/Centres/productbelongscenter`, data, null, true);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }


    async getUserCenters(): Promise<IServerResponse<Array<ICenter>>> {

        try {
            const resp = await this.httpClient.getJsonResponse(`${process.env.REACT_APP_ENDPOINT_URL}/Centres/usercenters`, null, true);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

    async associateAccountToCentreCode(data: IAccountCentreCode): Promise<IServerResponse<IUserProfile>> {

        try {
            const resp = await this.httpClient.postJsonData(`${process.env.REACT_APP_ENDPOINT_URL}/Centres/associatecentre`, data, null, false);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

}