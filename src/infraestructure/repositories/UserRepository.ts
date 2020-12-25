import { BaseRepository } from "./BaseRepository";
import {  IHttpClient, IUserRepository } from "../interfaces";
import { IServerResponse, ISearchProduct, IProduct, ILogin, IChangePassword, IUserProfile, IEmail, IAccount, IIncidence } from "../../domain/interfaces";



export class UserRepository extends BaseRepository implements IUserRepository {

    private readonly httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        super();
        this.httpClient = httpClient;
    }

    async createIncidence(incidence: IIncidence): Promise<IServerResponse<any>> {
        
        try {
            
            const resp = await this.httpClient.postJsonData(`${process.env.REACT_APP_ENDPOINT_URL}/Incidences`, incidence, null, true);
            return resp.data;          
        }
        catch (error) {
            if (error.response === undefined)
                throw error;

            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

    async login(login: ILogin): Promise<IServerResponse<string>> {

        try {
            const resp = await this.httpClient.postJsonData(`${process.env.REACT_APP_ENDPOINT_URL}/Users/Authenticate`, login, null, false);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;

            throw this.checkServerErrorInResponse(error.response.data);
        }

    }

    async changePassword(changePassword: IChangePassword): Promise<IServerResponse<string>> {

        try {
            const resp = await this.httpClient.postJsonData(`${process.env.REACT_APP_ENDPOINT_URL}/Users/changepassword`, changePassword, null, true);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;

            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

    async getFavoriteProducts(searchProduct: ISearchProduct): Promise<IServerResponse<Array<IProduct>>> {

        try {
            const resp = await this.httpClient.postJsonData(`${process.env.REACT_APP_ENDPOINT_URL}/ProductDetails/subsetproducts`, searchProduct, null, true);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;

            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

    async createAccount(account: IAccount): Promise<IServerResponse<IUserProfile>> {

        try {
            const resp = await this.httpClient.postJsonData(`${process.env.REACT_APP_ENDPOINT_URL}/Users/register`, account, null, false);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;
           
            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

    async recoverPassword(email: IEmail): Promise<IServerResponse<string>> {

        try {
            const resp = await this.httpClient.postJsonData(`${process.env.REACT_APP_ENDPOINT_URL}/Users/forgotPassword`, email, null, false);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;

            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

    async checkUserEmail(email: IEmail): Promise<IServerResponse<string>> {

        try {
            const resp = await this.httpClient.postJsonData(`${process.env.REACT_APP_ENDPOINT_URL}/Users/finduserbyemail`, email, null, false);
            return resp.data;
        }
        catch (error) {
            if (error.response === undefined)
                throw error;

            throw this.checkServerErrorInResponse(error.response.data);
        }
    }

}