import { IProductBelongToCenter, IServerResponse } from "../../../domain/interfaces";
import { ICheckProductBelongToCenterUseCase } from "../../interfaces";
import { ICenterRepository } from "../../../infraestructure/interfaces";
import { BaseUseCase } from "../BaseUseCase";


export class CheckProductBelongToCenterUseCase extends BaseUseCase implements ICheckProductBelongToCenterUseCase {

    private readonly centerRepository: ICenterRepository;

    constructor(centerRepository: ICenterRepository) {
        super();
        this.centerRepository = centerRepository;
    }

    checkProductBelongToCenter(data: IProductBelongToCenter): Promise<IServerResponse<string>> {
        return this.centerRepository.checkProductBelongToCenter(data);
    }


}