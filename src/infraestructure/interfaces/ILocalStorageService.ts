export interface ILocalStorageService {

    saveState(state:any | null): void;
    loadState(): any | null;    
}