import { BaseUseCase } from "../BaseUseCase";
import { ILoginUseCase } from "../../interfaces";
import { ITokenService, IUserRepository } from "../../../infraestructure/interfaces";
import { ILogin, IServerResponse } from "../../../domain/interfaces";


export class LoginUseCase extends BaseUseCase implements ILoginUseCase {

    private readonly userRepository: IUserRepository;
    private readonly tokenService: ITokenService;

    constructor(userRepository: IUserRepository, tokenService: ITokenService) {
        super();
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    async login(login: ILogin): Promise<IServerResponse<string>> {

        const resp = await this.userRepository.login(login)
        
        if ( resp.ServerData?.Data ) 
            this.tokenService.writeToken(resp.ServerData?.Data)
        
        return resp;
    }

}