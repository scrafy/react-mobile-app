import Actions from "./enumActions";

const initialState: any = {};

export default (state = initialState, action: any) => {
    switch (action.type) {

        case Actions.SET_LANGUAJE:
            return action.payload;

        default:
            return state;

    }
};
