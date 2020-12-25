import { ErrorCode } from "../enums"
import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {

    constructor(errorCode: ErrorCode, message: string) {

        super(errorCode, message);

    }
}