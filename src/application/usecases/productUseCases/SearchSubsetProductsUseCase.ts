import { BaseUseCase } from "../BaseUseCase";
import { ISearchSubsetProductsUseCase } from "../../interfaces";
import { IProductRepository } from "../../../infraestructure/interfaces";
import { ISearchProduct, IServerResponse, IProduct } from "../../../domain/interfaces";


export class SearchSubsetProductsUseCase extends BaseUseCase implements ISearchSubsetProductsUseCase {

    private readonly productRepository: IProductRepository;

    constructor(productRepository: IProductRepository) {
        super();
        this.productRepository = productRepository;
    }

    searchSubsetProducts(search: ISearchProduct, page: number): Promise<IServerResponse<IProduct[]>> {
        
        return this.productRepository.searchSubsetProducts(search, page);
    }
}