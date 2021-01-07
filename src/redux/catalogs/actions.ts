import { UnitOfWorkUseCase } from "src/application/unitsofwork";
import { IServerResponse, ICatalog } from "src/domain/interfaces";
import Actions from "./enumActions";



export default (errorCallback: (error: string) => void): any => {

    return {

        getCenterCatalogs: (centerId: number | null) => async (dispatch: any) => {

            try {

                if (centerId === null)
                    dispatch({
                        type: Actions.GET_CENTER_CATALOGS,
                        payload: []
                    })
                else {
                    const resp: IServerResponse<ICatalog[]> = await new UnitOfWorkUseCase().getCenterCatalogUseCase().getCenterCatalogs(centerId)

                    dispatch({
                        type: Actions.GET_CENTER_CATALOGS,
                        payload: resp.ServerData?.Data
                    })
                }

            }
            catch (error) {
                errorCallback(error.message);
            }
        },

        saveCatalog: (catalog: ICatalog | null) => async (dispatch: any) => {

            try {
                dispatch({
                    type: Actions.SAVE_CATALOG,
                    payload: catalog
                })
            }
            catch (error) {
                errorCallback(error.message);
            }
        }
    }
}

