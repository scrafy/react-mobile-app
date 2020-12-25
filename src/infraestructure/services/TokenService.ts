import { get, set, remove } from "local-storage";
import { ITokenService } from "../interfaces";
import { JwtTokenError } from "../../domain/exceptions";
import { ErrorCode } from "../../domain/enums";
const jwt = require('jsonwebtoken');


export class TokenService implements ITokenService {


    getPayload = (): any | undefined => {

        let payload;

        if (this.isTokenValid()) {
            payload = jwt.verify(this.readTokenFromLocalStorage(), process.env.REACT_APP_JWT_SECRET_KEY, { clockTolerance: 60 });
            return payload;
        }
        return undefined;
    }

    removeToken = (): void => {

        remove("token")
    }

    readTokenFromLocalStorage = (): string | undefined => get("token");

    writeTokenToLocalStorage = (token: string): void => {

        try {

            jwt.verify(token, process.env.REACT_APP_JWT_SECRET_KEY, { clockTolerance: 60 })
            set("token", token);
        }
        catch (error) {

            throw new JwtTokenError(ErrorCode.JWT_TOKEN_INVALID, error.message);
        }

    }

    isTokenValid = (): boolean => {

        const token = get("token");
        if (!token)
            return false;

        try {
            jwt.verify(token, process.env.REACT_APP_JWT_SECRET_KEY, { clockTolerance: 60 });
            return true;
        }
        catch (error) {
            return false;
        }

    }

    getClaimFromToken = (claim: string): string | undefined => {

        try {
            
            let payload;
            payload = jwt.verify(this.readTokenFromLocalStorage(), process.env.REACT_APP_JWT_SECRET_KEY, { clockTolerance: 60 });
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
