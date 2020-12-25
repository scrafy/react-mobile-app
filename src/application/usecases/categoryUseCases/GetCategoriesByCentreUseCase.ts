import { BaseUseCase } from "../BaseUseCase";
import { IGetCategoriesByCentreUseCase } from "../../interfaces";
import { ICategoryRepository } from "../../../infraestructure/interfaces";
import { IServerResponse, ICategory } from "../../../domain/interfaces";


export class GetCategoriesByCentreUseCase extends BaseUseCase implements IGetCategoriesByCentreUseCase {

    private readonly categoryRepository: ICategoryRepository;

    constructor(categoryRepository: ICategoryRepository) {
        super();
        this.categoryRepository = categoryRepository;
    }
    
    getCategoriesByCentre(centreId: number): Promise<IServerResponse<ICategory[]>> {
        return this.categoryRepository.getCategoriesByCentre(centreId);
    }
}