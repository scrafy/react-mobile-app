import { IServerError, IValidationError } from "../interfaces";
import { ErrorCode } from "../enums";

export class ServerError implements IServerError{
    
    ErrorMessage!: string;
    ErrorCode?: ErrorCode;
    StackTrace?: string;
    ValidationErrors?: IValidationError[];

  

}