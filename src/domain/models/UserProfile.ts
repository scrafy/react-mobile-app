import { IUserProfile } from "../interfaces/IUserProfile";


export class UserProfile implements IUserProfile {

    username!: string;
    email!: string;
    phone!: string;

}