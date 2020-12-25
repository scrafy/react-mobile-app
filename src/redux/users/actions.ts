import Actions from "./enumActions";


export default (errorCallback: (error: string) => void): any => {

    return {

        saveUserId: (userId: string | null) => (dispatch: any) => {

            try {
                dispatch({
                    type: Actions.SAVE_USER_ID,
                    payload: userId
                })
            }
            catch (error) {
                errorCallback(error.message);
            }

        }

    }
}
