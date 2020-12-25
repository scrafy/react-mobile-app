import Actions from "./enumActions";

const showNotification = (params: any) => async (dispatch: any) => {
    dispatch({
        type: Actions.SHOW_NOTIFICATION,
        payload: params
    })
};

const hideNotification = () => async (dispatch: any) => {
    dispatch({ type: Actions.HIDE_NOTIFICATION })
};

export default {
    showNotification,
    hideNotification
};