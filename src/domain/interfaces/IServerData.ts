import { IPaginationData } from ".";



export interface IServerData<T> {

    Data: T,
    PaginationData?: IPaginationData

}