import { BaseUseCase } from "../BaseUseCase";
import { IConfirmOrderUseCase } from "../../interfaces";
import { IOrderRepository } from "../../../infraestructure/interfaces";
import { IOrder, IServerResponse } from "../../../domain/interfaces";


export class ConfirmOrderUseCase extends BaseUseCase implements IConfirmOrderUseCase {

    private readonly orderRepository: IOrderRepository;

    constructor(orderRepository: IOrderRepository) {
        super();
        this.orderRepository = orderRepository;
    }


    confirmOrder(order: IOrder): Promise<IServerResponse<string>> {

        return this.orderRepository.confirmOrder(order);
    }


}