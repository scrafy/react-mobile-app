import { IChangePassword } from "../interfaces/IChangePassword";


export class ChangePassword implements IChangePassword{
    oldPassword!: string;
    newPassword!: string;
    confirmPassword!: string;

    
}