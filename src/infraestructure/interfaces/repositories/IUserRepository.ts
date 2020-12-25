import { IAccount, IChangePassword, IIncidence } from "../../../domain/interfaces";
import { IServerResponse } from "../../../domain/interfaces";
import { ISearchProduct } from "../../../domain/interfaces";
import { IUserProfile } from "../../../domain/interfaces";
import { IEmail } from "../../../domain/interfaces";
import { ILogin } from "../../../domain/interfaces";
import { IProduct } from "../../../domain/interfaces";



export interface IUserRepository {

     login(login:ILogin): Promise<IServerResponse<string>>
     changePassword(changePassword: IChangePassword): Promise<IServerResponse<string>>
     getFavoriteProducts( searchProduct: ISearchProduct ): Promise<IServerResponse<Array<IProduct>>>
     createAccount(account: IAccount): Promise<IServerResponse<IUserProfile>>
     recoverPassword(email: IEmail): Promise<IServerResponse<string>>
     checkUserEmail(email: IEmail): Promise<IServerResponse<string>>
     createIncidence(incidence: IIncidence): Promise<IServerResponse<any>>

}