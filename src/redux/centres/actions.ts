import { UnitOfWorkUseCase } from "src/application/unitsofwork";
import { IServerResponse, ICenter, IProduct, ISearchProduct } from "src/domain/interfaces";
import { SearchProduct } from "src/domain/models";
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

        getCenterProducts: (centerId: number | null) => async (dispatch: any) => {

            try {

                if (centerId) {

                    const search: ISearchProduct = new SearchProduct();
                    search.centerId = centerId;
                    const resp: IServerResponse<IProduct[]> = await new UnitOfWorkUseCase().getSearchProductUseCase().searchProducts(search, 1, undefined, 1000000)

                    dispatch({
                        type: Actions.GET_CENTER_PRODUCTS,
                        payload: resp.ServerData?.Data
                    })

                } else {
                    dispatch({
                        type: Actions.GET_CENTER_PRODUCTS,
                        payload: null
                    })
                }

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

