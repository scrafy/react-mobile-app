import { IApkVersion } from "../interfaces/IApkVersion";


export class ApkVersion implements IApkVersion{
    
    version!: string;
    changes?: string | undefined;
    isMandatory!: boolean;
    
}