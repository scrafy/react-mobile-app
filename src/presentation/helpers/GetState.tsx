import { IStateService, ITokenService } from 'src/infraestructure/interfaces';
import { IState } from 'src/infraestructure/interfaces';
import { UnitOfWorkService } from 'src/infraestructure/unitsofwork';

const GetState = async (req: any): Promise<IState> => {

    let state: IState;
    const tokenService: ITokenService = new UnitOfWorkService().getTokenService();
    if (!req.cookies["session"])
        throw new Error("Session not valid");

    if (!tokenService.isTokenValid(req.cookies["session"]))
        throw new Error("Session not valid");

    const stateService: IStateService = new UnitOfWorkService().getStateService();
    const resp: any = await stateService.loadState(req.cookies["session"]);

    if (resp.data.resp === null)
        state = { selectedCenter: null, selectedCatalog: null, cart: { products: [], center: null, supplier: null } }

    else
        state = JSON.parse(resp.data.resp);

    return state;
}

export default GetState;