import { IAccount, IServerResponse,  IUserProfile } from "../../../../domain/interfaces"

export  interface ICreateAccountUseCase {

    createAccount(account: IAccount): Promise<IServerResponse<IUserProfile>>
}