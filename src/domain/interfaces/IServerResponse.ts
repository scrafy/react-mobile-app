import ErrorCode from "../enums/ErrorCode"
import { IServerError, IServerData } from ".";

export interface IServerResponse<T> {

    StatusCode: ErrorCode,
    ServerError?: IServerError,
    ServerData?: IServerData<T>

}
