import { BaseUseCase } from "../BaseUseCase";
import { IGetCurrentApkVersion } from "../../interfaces";
import { IMetaInfoRepository } from "../../../infraestructure/interfaces";
import { IServerResponse, IApkVersion } from "../../../domain/interfaces";

export class GetCurrentApkVersion extends BaseUseCase implements IGetCurrentApkVersion {

    private readonly metaInfoRepository: IMetaInfoRepository;

    constructor(metaInfoRepository: IMetaInfoRepository) {
        super();
        this.metaInfoRepository = metaInfoRepository;
    }


    getCurrentApkVersion(): Promise<IServerResponse<IApkVersion>> {

        return this.metaInfoRepository.getCurrentApkVersion();
    }


}