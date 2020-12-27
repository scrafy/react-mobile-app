import { ICatalog, ICenter } from "src/domain/interfaces";
import ICart from "./ICart";

export default interface IState {

    selectedCenter: ICenter | null,
    selectedCatalog: ICatalog | null,
    cart: ICart,
    userId: string | null,
    token: string | null
}