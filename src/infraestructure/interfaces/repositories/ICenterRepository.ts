import { IProductBelongToCenter, IUserProfile } from "../../../domain/interfaces";
import { ICenter } from "../../../domain/interfaces";
import { IServerResponse } from "../../../domain/interfaces";
import { IAccountCentreCode } from "../../../domain/interfaces";

export interface ICenterRepository {

    getUserCenters(): Promise<IServerResponse<Array<ICenter>>>
    associateAccountToCentreCode(data: IAccountCentreCode): Promise<IServerResponse<IUserProfile>>
    checkProductBelongToCenter(data: IProductBelongToCenter): Promise<IServerResponse<string>>
}