import { IServerResponse,  IApkVersion } from "../../../../domain/interfaces"

export interface IGetCurrentApkVersion {

    getCurrentApkVersion(): Promise<IServerResponse<IApkVersion>>
}