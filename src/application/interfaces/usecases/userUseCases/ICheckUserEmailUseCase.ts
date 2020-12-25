import { IServerResponse,  IEmail } from "../../../../domain/interfaces"

export interface ICheckUserEmailUseCase {

    checkUserEmail(email: IEmail): Promise<IServerResponse<string>>
}