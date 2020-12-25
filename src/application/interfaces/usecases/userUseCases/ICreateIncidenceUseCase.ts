import { IIncidence, IServerResponse } from "../../../../domain/interfaces"

export  interface ICreateIncidenceUseCase {

    createIncidence(incidence: IIncidence): Promise<IServerResponse<any>>
}