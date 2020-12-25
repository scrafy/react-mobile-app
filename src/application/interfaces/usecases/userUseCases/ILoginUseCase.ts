import { IServerResponse,  ILogin } from "../../../../domain/interfaces"

export interface ILoginUseCase {
     
    login(login:ILogin): Promise<IServerResponse<string>>
}