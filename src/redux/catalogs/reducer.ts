import Actions from "./enumActions";

const initialState: any = {

    catalogs: [],
    selectedCatalog: null
}


export default (state = initialState, action: any) => {
    
    switch (action.type) {
        case Actions.GET_CENTER_CATALOGS:
            return { ...state, catalogs: action.payload };
        case Actions.SAVE_CATALOG:
            
            return { ...state, selectedCatalog: action.payload }
        default:
            return state;
    }
};
