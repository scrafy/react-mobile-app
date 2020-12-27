import { ITokenService } from 'src/infraestructure/interfaces';
import { UnitOfWorkService } from 'src/infraestructure/unitsofwork';


export const useCheckTokenInvalid = (callback: Function) => {

    const tokenService: ITokenService = new UnitOfWorkService().getTokenService();

    if (!tokenService.isTokenValid()) {
        callback();
        return
    }

    const interval = setInterval(() => {
        
        if (!tokenService.isTokenValid()) {
            clearInterval(interval);
            callback();
        }
    }, 500);

};


export const useCheckTokenValid = (callback: Function) => {

    const tokenService: ITokenService = new UnitOfWorkService().getTokenService();

    if (tokenService.isTokenValid()) {

        callback();
        return;
    }
    return;

};