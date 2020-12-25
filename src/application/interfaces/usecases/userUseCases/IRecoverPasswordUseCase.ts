import { IServerResponse,  IEmail } from "../../../../domain/interfaces"

export interface IRecoverPasswordUseCase {
     
    recoverPassword(email: IEmail): Promise<IServerResponse<string>>
}