import { BaseUseCase } from "../BaseUseCase";
import { IGetSellersUseCase } from "../../interfaces";
import { ISellerRepository } from "../../../infraestructure/interfaces";
import { IServerResponse, ISeller } from "../../../domain/interfaces";



export class GetSellersUseCase extends BaseUseCase implements IGetSellersUseCase {

    private readonly sellerRepository: ISellerRepository;

    constructor(sellerRepository: ISellerRepository) {
        super();
        this.sellerRepository = sellerRepository;
    }

    getSellers(): Promise<IServerResponse<Array<ISeller>>> {

        return this.sellerRepository.getSellers();
    }

}