import { IState, IStateService } from "../interfaces";
import { IHttpClient } from "../interfaces/IHttpClient";
import { UnitOfWorkService } from "../unitsofwork";


export class StateService implements IStateService {

    private client: IHttpClient;
   
    constructor() {

        this.client = new UnitOfWorkService().getHttpClientService();
     
    }

    async saveState(state: IState, sync: boolean = false): Promise<any> {

        return this.client.postJsonData('api/state/set', state, null, false);
    }

    async loadState(token?: string): Promise<IState> {

        if (token)
            return this.client.tokenGetJsonResponse(`http://localhost:${process.env.REACT_APP_LOCAL_PORT}/api/state/get`, null, token);
        else
            return this.client.getJsonResponse(`http://localhost:${process.env.REACT_APP_LOCAL_PORT}/api/state/get`, null, false);
    }
}
