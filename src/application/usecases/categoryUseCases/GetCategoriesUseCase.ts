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

    getCategories(catalogId: number, centreId: number): Promise<IServerResponse<ICategory[]>> {
        return this.categoryRepository.getCategories(catalogId, centreId);
    }
}