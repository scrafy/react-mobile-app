import { BaseUseCase } from "../BaseUseCase";
import { IChangePasswordUseCase } from "../../interfaces";
import { IUserRepository } from "../../../infraestructure/interfaces";
import { IChangePassword, IServerResponse } from "../../../domain/interfaces";


export class ChangePasswordUseCase extends BaseUseCase implements IChangePasswordUseCase {

    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        super();
        this.userRepository = userRepository;
    }

    changePassword(changePassword: IChangePassword): Promise<IServerResponse<string>> {

        return this.userRepository.changePassword(changePassword);
    }

}