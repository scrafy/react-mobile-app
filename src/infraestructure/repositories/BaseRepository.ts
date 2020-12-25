import { ErrorCode } from "../../domain/enums"
import { IServerResponse } from "../../domain/interfaces"
import { BaseError, ModelValidationError, BadRequestError, ResourceNotFoundError, InternalServerError } from "../../domain/exceptions"



export abstract class BaseRepository {

    protected checkServerErrorInResponse<T>(response: IServerResponse<T>): BaseError {

        switch (response.StatusCode) {

            case ErrorCode.BAD_REQUEST:
                if (response.ServerError?.ValidationErrors && response.ServerError?.ValidationErrors.length > 0) 

                    return new ModelValidationError(response.StatusCode, response.ServerError.ErrorMessage, response.ServerError.ValidationErrors)                
                else
                    return new BadRequestError(response.StatusCode, response.ServerError?.ErrorMessage || "Bad request")

            case ErrorCode.UNAUTHORIZED_ERROR:
                return new BadRequestError(response.StatusCode, response.ServerError?.ErrorMessage || "Unauthorized")

            case ErrorCode.RESOURCE_NOT_FOUND_ERROR:
                return new ResourceNotFoundError(response.StatusCode, response.ServerError?.ErrorMessage || "Resource not found error");

            case ErrorCode.SERVER_INTERNAL_ERROR:
                return new InternalServerError(response.StatusCode, response.ServerError?.ErrorMessage || "Internal Server Error");

            default:
                return new InternalServerError(response.StatusCode, response.ServerError?.ErrorMessage || "Internal Server Error");
        }
    }
}