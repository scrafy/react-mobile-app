import { IServerResponse,  IChangePassword } from "../../../../domain/interfaces"

export  interface IChangePasswordUseCase{

    changePassword(changePassword: IChangePassword): Promise<IServerResponse<string>>
}