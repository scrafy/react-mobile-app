import { IServerData, IPaginationData } from "../interfaces";


export class ServerData<T> implements IServerData<T>{
    
    Data!: T;
    PaginationData?: IPaginationData;
   
    
}