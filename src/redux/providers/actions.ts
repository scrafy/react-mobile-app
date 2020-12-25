import { UnitOfWorkUseCase } from "src/application/unitsofwork";
import { IServerResponse, ISeller } from "src/domain/interfaces";
import Actions from "./enumActions";


export default (errorCallback: (error: string) => void): any => {

    return {
        getProviders: async (dispatch: any) => {
            try {
                const resp: IServerResponse<ISeller[]> = await new UnitOfWorkUseCase().getSellersUseCase().getSellers()

                dispatch({
                    type: Actions.GET_USER_PROVIDERS,
                    payload: resp.ServerData?.Data
                })
            }
            catch (error) {
                errorCallback(error.message);
            }
        }
    }

}

