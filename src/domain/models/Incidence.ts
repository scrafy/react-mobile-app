import { IIncidence } from "../interfaces/IIncidence";


export class Incidence implements IIncidence{

    Subject!: string;
    Body!: string;
    File?: string | undefined;

   
}