import { IStateService } from "src/infraestructure/interfaces";
import { UnitOfWorkService } from "src/infraestructure/unitsofwork";

const useSetState = () => {

    return (state: any): void => {

        const stateService: IStateService = new UnitOfWorkService().getStateService();

        stateService.syncSaveState({

            selectedCenter: state.centers.selectedCenter,
            selectedCatalog: state.catalogs.selectedCatalog,
            cart: state.cart

        });
    }

};

export default useSetState;