import Actions from "./enumActions";

export default (state = [], action: any) => {
    switch (action.type) {
        case Actions.GET_USER_PROVIDERS:
            return action.payload;
        default:
            return state;
    }
};