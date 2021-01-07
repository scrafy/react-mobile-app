import { BaseUseCase } from "../BaseUseCase";
import { IGetOrdersDoneUseCase } from "../../interfaces";
import { IOrderRepository } from "../../../infraestructure/interfaces";
import { IServerResponse, IOrder } from "../../../domain/interfaces";

export class GetOrdersDoneUseCase extends BaseUseCase implements IGetOrdersDoneUseCase {

    private readonly orderRepository: IOrderRepository;

    constructor(orderRepository: IOrderRepository) {
        super();
        this.orderRepository = orderRepository;
    }

    getOrdersDone(orderId?: number, token?: string): Promise<IServerResponse<IOrder[]>> {

        return this.orderRepository.getOrdersDone(orderId, token);
    }

}