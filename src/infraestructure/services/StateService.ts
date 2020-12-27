import { IStateService, ICart } from "../interfaces";
import Cookies from "js-cookie";
import { ICenter, ICatalog } from "src/domain/interfaces";
import { IState } from "../interfaces";

export class StateService implements IStateService {

    constructor() {

        let state: IState = Cookies.getJSON("state");

        if (!state) {

            state = {
                selectedCenter: null,
                selectedCatalog: null,
                cart: {
                    products: [],
                    center: null,
                    supplier: null
                },
                userId: null,
                token: null
            }
            Cookies.set("state", JSON.stringify(state), { expires: 365 , path:''})
        }
    }

    loadToken(): string | null {

        let state: IState = Cookies.getJSON("state");
        return state.token || null;
    }

    saveToken(token: string | null): void {

        let state: IState = Cookies.getJSON("state");
        state.token = token;
        Cookies.set("state", JSON.stringify(state), { expires: 365 , path:''})
    }

    loadUserId(): string | null {

        let state: IState = Cookies.getJSON("state");
        return state.userId || null;
    }

    saveUserId(userId: string): void {

        let state: IState = Cookies.getJSON("state");
        state.userId = userId;
        Cookies.set("state", JSON.stringify(state), { expires: 365 , path:''})
    }

    saveCenter(center: ICenter): void {

        let state: IState = Cookies.getJSON("state");
        state.selectedCenter = center;
        Cookies.set("state", JSON.stringify(state), { expires: 365 , path:''})
    }

    loadCenter(): ICenter | null {

        let state: IState = Cookies.getJSON("state");
        return state.selectedCenter || null;
    }

    saveCatalog(catalog: ICatalog): void {

        let state: IState = Cookies.getJSON("state");
        state.selectedCatalog = catalog;
        Cookies.set("state", JSON.stringify(state), { expires: 365 , path:''})
    }

    loadCatalog(): ICatalog | null {

        let state: IState = Cookies.getJSON("state");
        return state.selectedCatalog || null;
    }

    loadCart(): ICart {
        let state: IState = Cookies.getJSON("state");
        return state.cart || null;

    }

    saveCart(cart: any) {

        let state: IState = Cookies.getJSON("state");
        state.cart = cart;
        Cookies.set("state", JSON.stringify(state), { expires: 365 , path:''})
    }

    saveState(state: IState): void {
        
        Cookies.set("state", JSON.stringify(state), { expires: 365 , path:''})
    }

    loadState(): IState  {

        let state: IState = Cookies.getJSON("state");
        return state;

    }

}