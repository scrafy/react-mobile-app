import { ITokenService } from 'src/infraestructure/interfaces';
import { UnitOfWorkService } from 'src/infraestructure/unitsofwork';


export const useCheckTokenInvalid = (ctx: any, path: string = '/index') => {

    const tokenService: ITokenService = new UnitOfWorkService().getTokenService();

    if (!tokenService.isTokenValid()) {
        ctx.res.writeHead(302, { Location: '/home' })
        ctx.res.end()
        return
    }

    const interval = setInterval(() => {
        if (!tokenService.isTokenValid()) {
            clearInterval(interval);
            ctx.res.writeHead(302, { Location: '/home' })
            ctx.res.end()
        }
    }, 500);

};


export const useCheckTokenValid = (ctx: any, path: string = '/home') => {

    
    const tokenService: ITokenService = new UnitOfWorkService().getTokenService();

    if (tokenService.isTokenValid()) {

        ctx.res.writeHead(302, { Location: '/home' })
        ctx.res.end()
        return;
    }
    return;

};