import { IProduct, ICenter, ISeller } from "src/domain/interfaces";

export default interface ICart {

    products: IProduct[],
    center: ICenter | null,
    supplier: ISeller | null
}
