import { BaseUseCase } from "../BaseUseCase";
import { IDeleteProductFromFavoriteListUseCase } from "../../interfaces";
import { IProductRepository } from "../../../infraestructure/interfaces";
import { IServerResponse } from "../../../domain/interfaces";



export class DeleteProductFromFavoriteListUseCase extends BaseUseCase implements IDeleteProductFromFavoriteListUseCase {

    private readonly productRepository: IProductRepository;

    constructor(productRepository: IProductRepository) {
        super();
        this.productRepository = productRepository;
    }

    deleteProductFromFavoriteList(productId: number): Promise<IServerResponse<string>> {

        return this.productRepository.deleteProductFromFavoriteList(productId);
    }
}