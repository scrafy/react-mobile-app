import { ICatalogRepository } from "../../../infraestructure/interfaces"
import { IGetCenterCatalogsUseCase } from "../../../application/interfaces"
import { IServerResponse, ICatalog } from "../../../domain/interfaces";
import { BaseUseCase } from "../BaseUseCase";


export class GetCenterCatalogsUseCase extends BaseUseCase implements IGetCenterCatalogsUseCase {

    private readonly catalogRepository: ICatalogRepository;

    constructor(catalogRepository: ICatalogRepository) {
        super();
        this.catalogRepository = catalogRepository;
    }

    getCenterCatalogs(centerId: number): Promise<IServerResponse<Array<ICatalog>>> {

        return this.catalogRepository.getCenterCatalogs(centerId);
    }

}