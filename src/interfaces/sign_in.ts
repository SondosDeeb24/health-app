
// ========================================================================================================
//? interface for sign_in controller
// ========================================================================================================

import { RowDataPacket } from "mysql2";

export interface user_signin_data extends RowDataPacket {
    user_role: string;
    user_fullname: string;
    user_gender : boolean;
    user_address: string;
    user_phone: string;
    user_email: string;
    user_birth_date: string;
    user_password: string;
    user_blood_type: string; 
    user_department: string;
}    
