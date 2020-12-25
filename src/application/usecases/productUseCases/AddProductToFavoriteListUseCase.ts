import { BaseUseCase } from "../BaseUseCase";
import { IAddProductToFavoriteListUseCase } from "../../interfaces";
import { IProductRepository } from "../../../infraestructure/interfaces";
import { IServerResponse } from "../../../domain/interfaces";

export class AddProductToFavoriteListUseCase extends BaseUseCase implements IAddProductToFavoriteListUseCase {

    private readonly productRepository: IProductRepository;

    constructor(productRepository: IProductRepository) {
        super();
        this.productRepository = productRepository;
    }

    addProductToFavoriteList(productId: number): Promise<IServerResponse<string>> {

        return this.productRepository.addProductToFavoriteList(productId);
    }


}