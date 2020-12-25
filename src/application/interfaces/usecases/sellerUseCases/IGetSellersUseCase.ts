import { IServerResponse,  ISeller } from "../../../../domain/interfaces"

export  interface IGetSellersUseCase {

    getSellers(): Promise<IServerResponse<Array<ISeller>>>
}