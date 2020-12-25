import { BaseRepository } from "./BaseRepository";
import { IMetaInfoRepository, IHttpClient } from "../interfaces";
import { IServerResponse, IApkVersion } from "../../domain/interfaces";



export class MetaInfoRepository extends BaseRepository implements IMetaInfoRepository {

    private readonly httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        super();
        this.httpClient = httpClient;
    }

    async getCurrentApkVersion(): Promise<IServerResponse<IApkVersion>> {

        try {
            const resp = await this.httpClient.getJsonResponse(`${process.env.REACT_APP_ENDPOINT_URL}/Meta/apkinfo`, null, false);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

    async getApkVersions(): Promise<IServerResponse<Array<IApkVersion>>> {

        try {
            const resp = await this.httpClient.getJsonResponse(`${process.env.REACT_APP_ENDPOINT_URL}/Meta/apkversions`, null, false);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

}