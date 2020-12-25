import { IServerResponse,  IApkVersion } from "../../../../domain/interfaces"

export  interface IGetApkVersions{
    
    getApkVersions(): Promise<IServerResponse<Array<IApkVersion>>>
}