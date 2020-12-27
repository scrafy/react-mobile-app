import { IHttpClient, ITokenService, IStateService } from "../interfaces";
import { HttpClient, TokenService, StateService } from "../services";



export class UnitOfWorkService {

    private httpClientService!: IHttpClient;
    private tokenService!: ITokenService;
    private stateService!: IStateService;
    private conf:any;

    constructor(conf: any = undefined) {

        this.conf = conf;

    }


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

    getStateService = (singleton: boolean = false): IStateService => {

        if (this.stateService === null || this.stateService === undefined)
            this.stateService = new StateService();

        if (singleton)
            return this.stateService;

        return new StateService();
    }
}