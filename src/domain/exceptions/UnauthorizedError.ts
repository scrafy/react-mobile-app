import { BaseError } from "./BaseError";
import { ErrorCode } from "../enums"

export class UnauthorizedError extends BaseError {

    constructor(errorCode: ErrorCode, message: string) {

        super(errorCode, message);

    }

}