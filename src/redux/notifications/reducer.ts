import Actions from "./enumActions";

const initialState: any = {
    show: false,
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case Actions.SHOW_NOTIFICATION:
            return { show: true, ...action.payload };
        case Actions.HIDE_NOTIFICATION:
            return { ...initialState };
        default:
            return state;
    }
};
