import { BaseUseCase } from "../BaseUseCase";
import { IGetProductsFromFavoriteListUseCase } from "../../interfaces";
import { IProductRepository } from "../../../infraestructure/interfaces";
import { IProduct, IServerResponse } from "../../../domain/interfaces";

export class GetProductsFromFavoriteListUseCase extends BaseUseCase implements IGetProductsFromFavoriteListUseCase {

    private readonly productRepository: IProductRepository;

    constructor(productRepository: IProductRepository) {
        super();
        this.productRepository = productRepository;
    }

    getProductsFromFavoriteList(centerId:number): Promise<IServerResponse<IProduct[]>> {
        return this.productRepository.getProductsFromFavoriteList(centerId);
    }
}