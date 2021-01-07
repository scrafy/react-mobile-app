import { ITokenService } from "../interfaces";
import { JwtTokenError } from "../../domain/exceptions";
import { ErrorCode } from "../../domain/enums";
import Cookies from "js-cookie";
const jwt = require('jsonwebtoken');


export class TokenService implements ITokenService {

    getPayload = (): any | undefined => {

        let payload;

        if (this.isTokenValid()) {
            payload = jwt.verify(this.readToken(), process.env.REACT_APP_JWT_SECRET_KEY, { clockTolerance: 60 });
            return payload;
        }
        return undefined;
    }

    removeToken = (): void => {

        this.writeToken(null);
    }

    readToken = (): string | null => {

        let token: string = Cookies.getJSON("session");
        if (token)
            return token;

        return null;

    }

    writeToken = (token: string | null): void => {

        try {

            if (token) {
                jwt.verify(token, process.env.REACT_APP_JWT_SECRET_KEY, { clockTolerance: 60 })
                Cookies.set("session", token, { expires: 7, path: '' })
            } else {
                Cookies.remove("session", { path: '' })
            }
        }
        catch (error) {

            throw new JwtTokenError(ErrorCode.JWT_TOKEN_INVALID, error.message);
        }

    }

    isTokenValid = (token?: string): boolean => {

        let _token: string | null;

        if (!token)
            _token = this.readToken();
        else
            _token = token

        if (!_token)
            return false;

        try {
            jwt.verify(_token, process.env.REACT_APP_JWT_SECRET_KEY, { clockTolerance: 60 });
            return true;
        }
        catch (error) {
            return false;
        }

    }

    getClaimFromToken = (claim: string): string | undefined => {

        try {

            let payload;
            payload = jwt.verify(this.readToken(), process.env.REACT_APP_JWT_SECRET_KEY, { clockTolerance: 60 });
            const value = payload[claim]
            if (!value)
                throw new JwtTokenError(ErrorCode.JWT_TOKEN_INVALID, `It was not possible to get ${claim} claim from token`);

            return value

        }
        catch (error) {
            return undefined;
        }

    }

}
