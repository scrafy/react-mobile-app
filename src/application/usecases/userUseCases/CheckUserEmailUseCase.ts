import { BaseUseCase } from "../BaseUseCase";
import { ICheckUserEmailUseCase } from "../../interfaces";
import { IUserRepository } from "../../../infraestructure/interfaces";
import { IEmail, IServerResponse } from "../../../domain/interfaces";


export class CheckUserEmailUseCase extends BaseUseCase implements ICheckUserEmailUseCase {

    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        super();
        this.userRepository = userRepository;
    }

    checkUserEmail(email: IEmail): Promise<IServerResponse<string>> {
        
        return this.userRepository.checkUserEmail(email);
    }

}