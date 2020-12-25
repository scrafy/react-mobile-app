import { IAccount } from "../interfaces/IAccount";

export class Account implements IAccount
{
    Username!: string
    Password!: string;
    ConfirmPassword!: string;
    Phone!: string;
    Email!: string;
    CentreCode!: string;
    
}