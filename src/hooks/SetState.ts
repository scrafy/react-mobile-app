import { useRouter } from "next/router";
import { useDispatch, useStore } from "react-redux";
import { IStateService, ITokenService } from "src/infraestructure/interfaces";
import { UnitOfWorkService } from "src/infraestructure/unitsofwork";
import notify from 'src/redux/notifications/actions';

const useSetState = () => {


    const stateService: IStateService = new UnitOfWorkService().getStateService();
    const tokenService: ITokenService = new UnitOfWorkService().getTokenService();
    const router: any = useRouter();
    const dispatch = useDispatch();

    return async (state:any): Promise<any> => {

        try {
            await stateService.saveState({

                selectedCenter: state.centers.selectedCenter,
                selectedCatalog: state.catalogs.selectedCatalog,
                cart: state.cart

            });

        }
        catch (error) {

            router.push('/');
            tokenService.writeToken(null);
            dispatch(
                notify.showNotification({
                    type: 'confirm',
                    title: 'Error',
                    message: error.message,
                    onlyOk: true,
                    textOk: 'OK',
                })
            )
        }

    }

};

export default useSetState;