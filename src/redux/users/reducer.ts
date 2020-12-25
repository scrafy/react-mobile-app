import Actions from "./enumActions";

const initialState: string | null = null;


export default (state = initialState, action: any) => {

    switch (action.type) {
        case Actions.SAVE_USER_ID:
            return action.payload;
        default:
            return state;
    }
};
