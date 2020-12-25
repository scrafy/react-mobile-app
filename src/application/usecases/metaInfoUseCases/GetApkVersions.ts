import { BaseUseCase } from "../BaseUseCase";
import { IGetApkVersions } from "../../interfaces";
import { IMetaInfoRepository } from "../../../infraestructure/interfaces";
import { IServerResponse, IApkVersion } from "../../../domain/interfaces";


export class GetApkVersions extends BaseUseCase implements IGetApkVersions {


    private readonly metaInfoRepository: IMetaInfoRepository;

    constructor(metaInfoRepository: IMetaInfoRepository) {
        super();
        this.metaInfoRepository = metaInfoRepository;
    }

    getApkVersions(): Promise<IServerResponse<Array<IApkVersion>>> {
        return this.metaInfoRepository.getApkVersions();
    }

}