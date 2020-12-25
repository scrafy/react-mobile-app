import { BaseError } from "./BaseError";
import { ErrorCode } from "../enums"

export class JwtTokenError extends BaseError {

    constructor(errorCode: ErrorCode, message: string) {

        super(errorCode, message);

    }
}