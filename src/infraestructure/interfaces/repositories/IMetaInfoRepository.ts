import { IApkVersion } from "../../../domain/interfaces";
import { IServerResponse } from "../../../domain/interfaces";

export interface IMetaInfoRepository {

    getCurrentApkVersion(): Promise<IServerResponse<IApkVersion>>
    getApkVersions(): Promise<IServerResponse<Array<IApkVersion>>>

}
