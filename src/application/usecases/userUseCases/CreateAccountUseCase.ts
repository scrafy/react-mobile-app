import { BaseUseCase } from "../BaseUseCase";
import { ICreateAccountUseCase } from "../../interfaces";
import { IUserRepository } from "../../../infraestructure/interfaces";
import { IAccount, IServerResponse, IUserProfile } from "../../../domain/interfaces";

export class CreateAccountUseCase extends BaseUseCase implements ICreateAccountUseCase {

    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        super();
        this.userRepository = userRepository;
    }

    createAccount(account: IAccount): Promise<IServerResponse<IUserProfile>> {
        
        return this.userRepository.createAccount(account);
    }


}