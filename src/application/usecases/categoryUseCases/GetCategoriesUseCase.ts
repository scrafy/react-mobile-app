import { BaseUseCase } from "../BaseUseCase";
import { IGetCategoriesUseCase } from "../../interfaces";
import { ICategoryRepository } from "../../../infraestructure/interfaces";
import { IServerResponse, ICategory } from "../../../domain/interfaces";


export class GetCategoriesUseCase extends BaseUseCase implements IGetCategoriesUseCase {

    private readonly categoryRepository: ICategoryRepository;

    constructor(categoryRepository: ICategoryRepository) {
        super();
        this.categoryRepository = categoryRepository;
    }

    getCategories(catalogId: number, centreId: number, token?: string): Promise<IServerResponse<ICategory[]>> {

        if (token)
            return this.categoryRepository.tokenGetCategories(catalogId, centreId, token);
        else
            return this.categoryRepository.getCategories(catalogId, centreId);
    }
}