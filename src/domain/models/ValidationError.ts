import { IValidationError } from "../interfaces/IValidationError";


export class ValidationError implements IValidationError {

    ErrorMessage!: string;
    FieldName!: string;

}