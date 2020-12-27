import { JwtTokenError } from "../../domain/exceptions";
import { IHttpClient, ITokenService } from "../interfaces";
import { ErrorCode } from "../../domain/enums";

const axios = require('axios');


export class HttpClient implements IHttpClient {

    private readonly tokenService: ITokenService;
    private readonly axios: any;
    private conf: any;

    constructor( tokenService: ITokenService, conf: any = undefined ) {

        this.tokenService = tokenService;
        this.conf = conf;
        let headers: any = {};
        let token: string | undefined = this.conf && this.conf.token ? this.conf.token : undefined;

        if (token)

            headers = {

                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }

        else

            headers = {

                "Content-Type": "application/json",
                "Accept": "application/json"
            }

        this.axios = axios.create({

            headers
        });

    }

    setHeaders = (headers: Map<string, string>, conf: { [k: string]: string }): Object => {

        headers.forEach((value: string, key: string) => {

            conf[key] = value;
        });

        return conf;
    }

    async getJsonResponse(url: string, headers: Map<string, string> | null, addToken: boolean | null): Promise<any> {

        let headersObject: { [k: string]: string } = {};
        const token: string | null = this.tokenService.readToken();

        if (!headers)
            headers = new Map<string, string>();

        if (addToken)

            if (token)
                headers.set("Authorization", `Bearer ${token}`);
            else
                throw new JwtTokenError(ErrorCode.JWT_TOKEN_INVALID, "It was not possible to read token from local storage");


        if (headers && headers.size > 0)
            this.setHeaders(headers, headersObject)

        try {
            const resp = await this.axios.get(url, {
                headers: headersObject,
                validateStatus: function (status: number) {

                    return status >= 200 && status < 300;
                }
            });

            if (resp.headers['x-session-token'])
                this.tokenService.writeToken(resp.headers['x-session-token']);

            return resp;
        }
        catch (error) {
            throw error;
        }
    }

    async delete(url: string, headers: Map<string, string> | null, addToken: boolean | null): Promise<any> {

        let headersObject: { [k: string]: string } = {};
        const token: string | null = this.tokenService.readToken();

        if (!headers)
            headers = new Map<string, string>();

        if (addToken)

            if (token)
                headers.set("Authorization", `Bearer ${token}`);
            else
                throw new JwtTokenError(ErrorCode.JWT_TOKEN_INVALID, "It was not possible to read token from local storage");


        if (headers && headers.size > 0)
            this.setHeaders(headers, headersObject)

        const resp = await this.axios.delete(url, {
            headers: headersObject,
            validateStatus: function (status: number) {

                return status >= 200 && status < 300;
            }
        });

        if (resp.headers['x-session-token'])
            this.tokenService.writeToken(resp.headers['x-session-token']);

        return resp;
    }

    async postJsonData(url: string, body: any, headers: Map<string, string> | null, addToken: boolean | null): Promise<any> {

        let headersObject: { [k: string]: string } = {};
        const token: string | null = this.tokenService.readToken();

        if (!headers)
            headers = new Map<string, string>();

        if (addToken)

            if (token)
                headers.set("Authorization", `Bearer ${token}`);
            else
                throw new JwtTokenError(ErrorCode.JWT_TOKEN_INVALID, "It was not possible to read token from local storage");


        if (headers && headers.size > 0)
            this.setHeaders(headers, headersObject)

        const resp = await this.axios.post(url, body, {
            headers: headersObject,
            validateStatus: function (status: number) {

                return status >= 200 && status < 300;
            }
        });

        if (resp.headers['x-session-token'])
            this.tokenService.writeToken(resp.headers['x-session-token']);


        return resp;

    }

    async postNoBody(url: string, headers: Map<string, string> | null, addToken: boolean | null): Promise<any> {

        let headersObject: { [k: string]: string } = {};
        const token: string | null = this.tokenService.readToken();

        if (!headers)
            headers = new Map<string, string>();

        if (addToken)

            if (token)
                headers.set("Authorization", `Bearer ${token}`);
            else
                throw new JwtTokenError(ErrorCode.JWT_TOKEN_INVALID, "It was not possible to read token from local storage");


        if (headers && headers.size > 0)
            this.setHeaders(headers, headersObject)

        const resp = await this.axios.post(url, null, {
            headers: headersObject,
            validateStatus: function (status: number) {

                return status >= 200 && status < 300;
            }
        });

        if (resp.headers['x-session-token'])
            this.tokenService.writeToken(resp.headers['x-session-token']);

        return resp;
    }
}


