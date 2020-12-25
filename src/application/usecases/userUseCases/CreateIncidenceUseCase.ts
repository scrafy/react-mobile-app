import { BaseUseCase } from "../BaseUseCase";
import { ICreateIncidenceUseCase } from "../../interfaces";
import { IUserRepository } from "../../../infraestructure/interfaces";
import { IIncidence, IServerResponse } from "../../../domain/interfaces";

export class CreateIncidenceUseCase extends BaseUseCase implements ICreateIncidenceUseCase {

    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        super();
        this.userRepository = userRepository;
    }
    
    createIncidence(incidence: IIncidence): Promise<IServerResponse<any>> {
        return this.userRepository.createIncidence(incidence);
    }
}