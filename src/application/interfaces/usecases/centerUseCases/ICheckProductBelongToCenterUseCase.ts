import { IProductBelongToCenter, IServerResponse } from "../../../../domain/interfaces"

export interface ICheckProductBelongToCenterUseCase {

    checkProductBelongToCenter(data: IProductBelongToCenter): Promise<IServerResponse<string>>
}