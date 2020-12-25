import { ISeller } from "../../../domain/interfaces";
import { IServerResponse } from "../../../domain/interfaces";

export interface ISellerRepository {

    getSellers(): Promise<IServerResponse<Array<ISeller>>>

}