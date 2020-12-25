import { BaseError } from "./BaseError";
import { ErrorCode } from "../enums"
import { IValidationError } from "../interfaces";



export class ModelValidationError extends BaseError {

    validationErrors!: Array<IValidationError>;

    constructor(errorCode: ErrorCode, message: string, validationErrors: Array<IValidationError>) {

        super(errorCode, message);
        this.validationErrors = validationErrors;
    }
}