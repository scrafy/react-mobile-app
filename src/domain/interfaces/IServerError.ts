import ErrorCode from "../enums/ErrorCode";
import { IValidationError } from "./IValidationError";

export interface IServerError {

    ErrorMessage: string,
    ErrorCode?: ErrorCode,
    StackTrace?: string,
    ValidationErrors?: IValidationError[]
}


