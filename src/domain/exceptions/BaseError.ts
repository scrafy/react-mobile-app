import { ErrorCode } from "../enums"

export class BaseError extends Error {

    errorCode: ErrorCode;

    constructor(errorCode: ErrorCode, message: string) {
        super(message);
        this.errorCode = errorCode;
    }

}