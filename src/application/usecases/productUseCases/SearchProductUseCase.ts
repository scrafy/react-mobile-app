import { BaseUseCase } from "../BaseUseCase";
import { ISearchProductsUseCase } from "../../interfaces";
import { IProductRepository } from "../../../infraestructure/interfaces";
import { ISearchProduct, IServerResponse, IProduct } from "../../../domain/interfaces";


export class SearchProductUseCase extends BaseUseCase implements ISearchProductsUseCase {

    private readonly productRepository: IProductRepository;

    constructor(productRepository: IProductRepository) {
        super();
        this.productRepository = productRepository;
    }


    searchProducts(search: ISearchProduct, page: number, token?: string): Promise<IServerResponse<IProduct[]>> {

        if (token)
            return this.productRepository.tokenSearchProducts(search, page, token);
        else
            return this.productRepository.searchProducts(search, page);
    }

}