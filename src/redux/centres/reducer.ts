import Actions from "./enumActions";


const initialState: any = {

    centers:[],
    selectedCenter:null
}


export default (state = initialState, action: any) => {
    
    switch (action.type) {
        case Actions.GET_USER_CENTERS:
            return {...state, centers:action.payload};
        case Actions.SAVE_CENTER:
            return {...state, selectedCenter:action.payload};
        default:
            return state;
    }
};
