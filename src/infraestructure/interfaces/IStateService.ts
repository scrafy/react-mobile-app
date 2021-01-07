import { IState } from ".";


export interface IStateService {

    saveState(state: IState): Promise<any>;
    loadState(token?:string): Promise<IState>;

}