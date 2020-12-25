import { BaseUseCase } from "../BaseUseCase";
import { IRouteRepository } from "../../../infraestructure/interfaces";
import { IServerResponse } from "../../../domain/interfaces";
import { IGetCenterDeliveryDaysUseCase } from "src/application/interfaces";


export class GetCenterDeliveryDaysUseCase extends BaseUseCase implements IGetCenterDeliveryDaysUseCase {

    private readonly routeRepository: IRouteRepository;

    constructor(routeRepository: IRouteRepository) {
        super();
        this.routeRepository = routeRepository;
    }

    getCenterDeliveryDays(centerId: number, month: number, year: number): Promise<IServerResponse<Date[]>> {
        return this.routeRepository.getCenterDeliveryDays(centerId, month, year);
    }
}