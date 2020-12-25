import { IHttpClient, ITokenService, ILocalStorageService } from "../interfaces";
import { HttpClient, TokenService, LocalStorageService } from "../services";



export class UnitOfWorkService {

    private httpClientService!: IHttpClient;
    private tokenService!: ITokenService;
    private localStorageService!: ILocalStorageService;


    getHttpClientService = (singleton: boolean = false): IHttpClient => {

        if (this.httpClientService === null || this.httpClientService === undefined)
            this.httpClientService = new HttpClient(new TokenService());

        if (singleton)
            return this.httpClientService;

        return new HttpClient(new TokenService());
    }

    getTokenService = (singleton: boolean = false): ITokenService => {

        if (this.tokenService === null || this.tokenService === undefined)
            this.tokenService = new TokenService();

        if (singleton)
            return this.tokenService;

        return new TokenService();
    }

    getLocalStorageService = (singleton: boolean = false): ILocalStorageService => {

        if (this.localStorageService === null || this.localStorageService === undefined)
            this.localStorageService = new LocalStorageService();

        if (singleton)
            return this.localStorageService;

        return new LocalStorageService();
    }
}