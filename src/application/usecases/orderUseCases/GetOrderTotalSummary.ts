import { BaseUseCase } from "../BaseUseCase";
import { IGetOrderTotalSummaryUseCase } from "../../interfaces";
import { IOrderRepository } from "../../../infraestructure/interfaces";
import { IOrder, IServerResponse } from "../../../domain/interfaces";



export class GetOrderTotalSummary extends BaseUseCase implements IGetOrderTotalSummaryUseCase {

    private readonly orderRepository: IOrderRepository;

    constructor(orderRepository: IOrderRepository) {
        super();
        this.orderRepository = orderRepository;
    }

    getOrderTotalsSummary(order: IOrder): Promise<IServerResponse<IOrder>> {

        return this.orderRepository.getOrderTotalsSummary(order);
    }
}