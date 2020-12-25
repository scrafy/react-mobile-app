import { BaseUseCase } from "../BaseUseCase";
import { IGetFavoriteProductsUseCase } from "../../interfaces";
import { IUserRepository } from "../../../infraestructure/interfaces";
import { ISearchProduct, IServerResponse, IProduct } from "../../../domain/interfaces";

export class GetFavoriteProductsUseCase extends BaseUseCase implements IGetFavoriteProductsUseCase {

    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        super();
        this.userRepository = userRepository;
    }

    getFavoriteProducts(searchProduct: ISearchProduct): Promise<IServerResponse<IProduct[]>> {

        return this.userRepository.getFavoriteProducts(searchProduct);
    }
}