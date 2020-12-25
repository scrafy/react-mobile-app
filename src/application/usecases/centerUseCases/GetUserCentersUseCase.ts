import { BaseUseCase } from "../BaseUseCase";
import { IGetUserCentersUseCase } from "../../interfaces";
import { ICenterRepository } from "../../../infraestructure/interfaces";
import { IServerResponse, ICenter } from "../../../domain/interfaces";


export class GetUserCentersUseCase extends BaseUseCase implements IGetUserCentersUseCase {

    private readonly centerRepository: ICenterRepository;

    constructor(centerRepository: ICenterRepository) {
        super();
        this.centerRepository = centerRepository;
    }


    getUserCenters(): Promise<IServerResponse<ICenter[]>> {

        return this.centerRepository.getUserCenters();
    }

}