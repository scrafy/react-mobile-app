import { IState } from ".";


export interface IStateService {

    saveState(state: IState): Promise<any>;
    syncSaveState(state: IState): any;
    loadState(token?:string): Promise<IState>;

}