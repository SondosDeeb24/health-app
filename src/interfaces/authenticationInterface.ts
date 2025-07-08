// ========================================================================================================
import { RowDataPacket } from "mysql2";


//import enums
import {role, gender, bloodTypes, departments} from '../enums/userEnum'
// ========================================================================================================
//? interface for signin data
// ========================================================================================================
type UserID = number;
export interface user_signin_data extends RowDataPacket {
    userID: UserID;
    user_role:  keyof typeof role;
    user_fullname: string;
    user_gender : keyof typeof gender;
    user_address: string;
    user_phone: string;
    user_email: string;
    user_birth_date: string;

    user_blood_type:  keyof typeof bloodTypes; 
    user_department:  keyof typeof departments;
    user_password: string;
}    

// ========================================================================================================
//? interface for login data taken from user
// ========================================================================================================
export interface login_data {
    user_email: string;
    user_password: string;
}