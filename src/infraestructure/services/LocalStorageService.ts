import { ILocalStorageService } from "../interfaces/ILocalStorageService";
import Cookies from 'universal-cookie';

export class LocalStorageService implements ILocalStorageService {

    saveState(state: any): void {

        const cookies = new Cookies();
        const myDate = new Date(new Date().getTime()+(1*24*60*60*1000));
        console.log(state);
        /* if (cookie.getJSON("state"))
             cookie.remove("state", { expires: 1, domain:'localhost', path:'/' });*/

        cookies.set("state", state, { expires: myDate, domain: 'localhost', path: '/' });
    }

    loadState() {

        const cookies = new Cookies();
        const state: any = cookies.get("state");

        if (state === null || state === undefined)
            return null

        return state;
    }
}