import { UnitOfWorkUseCase } from "src/application/unitsofwork";
import { IServerResponse, ICenter } from "src/domain/interfaces";
import Actions from "./enumActions";



export default (errorCallback: (error: string) => void): any => {
    
    return {

        getCenters: async (dispatch: any) => {
            try {

                const resp: IServerResponse<ICenter[]> = await new UnitOfWorkUseCase().getUserCentersUseCase().getUserCenters();

                dispatch({
                    type: Actions.GET_USER_CENTERS,
                    payload: resp.ServerData?.Data
                })
            }
            catch (error) {
                errorCallback(error.message);
            }
        },

        saveCenter: (center: ICenter | null) => async (dispatch: any) => {

            try {

                dispatch({
                    type: Actions.SAVE_CENTER,
                    payload: center
                })
            }
            catch (error) {
                errorCallback(error.message);
            }
        }

    }
}

