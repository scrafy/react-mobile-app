import { BaseUseCase } from "../BaseUseCase";
import { IAssociateAccountToCentreCodeUseCase } from "../../interfaces";
import { ICenterRepository } from "../../../infraestructure/interfaces";
import { IAccountCentreCode, IServerResponse, IUserProfile } from "../../../domain/interfaces";

export class AssociateAccountToCentreCodeUseCase extends BaseUseCase implements IAssociateAccountToCentreCodeUseCase {

    private readonly centerRepository: ICenterRepository;

    constructor(centerRepository: ICenterRepository) {
        super();
        this.centerRepository = centerRepository;
    }

    associateAccountToCentreCode(data: IAccountCentreCode): Promise<IServerResponse<IUserProfile>> {
        return this.centerRepository.associateAccountToCentreCode(data);
    }
}