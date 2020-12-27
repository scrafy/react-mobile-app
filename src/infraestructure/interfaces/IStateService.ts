import { ICatalog, ICenter } from "src/domain/interfaces";
import { ICart, IState } from ".";


export interface IStateService {

    saveCenter(center: ICenter | null): void;
    loadCenter(): ICenter | null;
    saveCatalog(catalog: ICatalog | null): void;
    loadCatalog(): ICatalog | null;
    loadCart(): ICart | null;
    saveCart(cart: ICart | null): void;
    loadUserId(): string | null;
    saveUserId(userId: string | null): void;
    loadToken(): string | null;
    saveToken(token: string | null): void;
    saveState(state: IState): void;
    loadState(): IState;

}