import { IServerResponse, IAccountCentreCode, IUserProfile } from "../../../../domain/interfaces"

export interface IAssociateAccountToCentreCodeUseCase{
    
    associateAccountToCentreCode(data: IAccountCentreCode): Promise<IServerResponse<IUserProfile>>
}