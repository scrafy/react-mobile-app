import { IServerResponse } from "../interfaces/IServerResponse";
import { ErrorCode } from "../enums";
import { IServerError, IServerData } from "../interfaces";


export class ServerResponse<T> implements IServerResponse<T>{
    
    StatusCode!: ErrorCode;
    ServerError?: IServerError;
    ServerData?: IServerData<T>;

    
}