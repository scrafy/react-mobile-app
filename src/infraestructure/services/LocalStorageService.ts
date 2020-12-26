import { ILocalStorageService } from "../interfaces/ILocalStorageService";
import { get, set } from "local-storage";

export class LocalStorageService implements ILocalStorageService {

    saveState(state: any): void {
        set("state", JSON.stringify(state));
    }

    loadState() {

        if ( get("state") === null || get("state") === undefined )
            return null

        return JSON.parse(get("state"));
    }
}