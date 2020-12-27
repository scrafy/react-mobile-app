import { ICatalog, ICenter } from "src/domain/interfaces";
import { IState } from ".";


export interface IStateService {

    saveCenter(center: ICenter | null): void;
    loadCenter(): ICenter | null;
    saveCatalog(catalog: ICatalog | null): void;
    loadCatalog(): ICatalog | null;
    loadCart(): any | null;
    saveCart(cart: any | null): any;
    loadUserId(): string | null;
    saveUserId(userId: string): void;
    loadToken(): string | null;
    saveToken(token: string | null): void;
    saveState(state: IState): void;
    loadState(): IState;

}