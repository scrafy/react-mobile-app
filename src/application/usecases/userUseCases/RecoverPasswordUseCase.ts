import { BaseUseCase } from "../BaseUseCase";
import { IRecoverPasswordUseCase } from "../../interfaces";
import { IUserRepository } from "../../../infraestructure/interfaces";
import { IEmail, IServerResponse } from "../../../domain/interfaces";

export class RecoverPasswordUseCase extends BaseUseCase implements IRecoverPasswordUseCase {

    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        super();
        this.userRepository = userRepository;
    }

    recoverPassword(email: IEmail): Promise<IServerResponse<string>> {

        return this.userRepository.recoverPassword(email);
    }

}