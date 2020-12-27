import { IStateService, ICart } from "../interfaces";
import Cookies from "js-cookie";
import { ICenter, ICatalog } from "src/domain/interfaces";
import { IState } from "../interfaces";

export class StateService implements IStateService {

    constructor() {

        let state: IState = Cookies.getJSON("state");

        if (!state)
            Cookies.set("state", JSON.stringify(this.createState()), { expires: 365, path: '' })

    }


    private createState(): IState {

        const state: IState = {
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
        return state;
    }

    loadToken(): string | null {

        let state: IState = Cookies.getJSON("state");
        if (state)
            return state.token;

        return null;
    }

    saveToken(token: string | null): void {

        let state: IState = Cookies.getJSON("state");
        if (state)
            state.token = token;
        else {
            state = this.createState();
            state.token = token;
        }

        Cookies.set("state", JSON.stringify(state), { expires: 365, path: '' })
    }

    loadUserId(): string | null {

        let state: IState = Cookies.getJSON("state");
        if (state)
            return state.userId;

        return null;
    }

    saveUserId(userId: string | null): void {

        let state: IState = Cookies.getJSON("state");
        if (state)
            state.userId = userId;
        else {
            state = this.createState();
            state.userId = userId;
        }
        Cookies.set("state", JSON.stringify(state), { expires: 365, path: '' })
    }

    saveCenter(center: ICenter | null): void {

        let state: IState = Cookies.getJSON("state");
        if (state)
            state.selectedCenter = center;
        else {
            state = this.createState();
            state.selectedCenter = center;
        }
        Cookies.set("state", JSON.stringify(state), { expires: 365, path: '' })
    }

    loadCenter(): ICenter | null {

        let state: IState = Cookies.getJSON("state");
        if (state)
            return state.selectedCenter;

        return null;
    }

    saveCatalog(catalog: ICatalog | null): void {

        let state: IState = Cookies.getJSON("state");
        if (state)
            state.selectedCatalog = catalog;
        else {
            state = this.createState();
            state.selectedCatalog = catalog;
        }
        Cookies.set("state", JSON.stringify(state), { expires: 365, path: '' })
    }

    loadCatalog(): ICatalog | null {

        let state: IState = Cookies.getJSON("state");
        if (state)
            return state.selectedCatalog;

        return null;
    }

    loadCart(): ICart | null {

        let state: IState = Cookies.getJSON("state");
        if (state)
            return state.cart;

        return null;

    }

    saveCart(cart: ICart | null): void {

        let state: IState = Cookies.getJSON("state");
        if (state)
            state.cart = cart || {
                products: [],
                center: null,
                supplier: null
            };
        else {
            state = this.createState();
            state.cart = {
                products: [],
                center: null,
                supplier: null
            };
        }
        Cookies.set("state", JSON.stringify(state), { expires: 365, path: '' })
        
    }

    saveState(state: IState): void {

        Cookies.set("state", JSON.stringify(state), { expires: 365, path: '' })
    }

    loadState(): IState {

        let state: IState = Cookies.getJSON("state") || this.createState();
        return state;

    }

}