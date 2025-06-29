

// ========================================================================================================
//? interface from login controller
// ========================================================================================================

interface login_data {
    email: string;
    password: string;
}

// ========================================================================================================
//? interface from sign in controller
// ========================================================================================================

import { RowDataPacket } from "mysql2";

interface user_signin_data extends RowDataPacket {
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


// ========================================================================================================
//? interface for login_required middleware
// ========================================================================================================

interface JWT_data{
    user_id: string;
    user_fullname: string;
    user_role: string;
}



// ========================================================================================================
//? interface to create appointment
// ========================================================================================================

interface create_appointment{
    patient_id: number, 
    doctor_id: number,
    appointment_type: string, 
    appointment_service: string,
    appointment_notes?: string
}

// ========================================================================================================
//? interface for optinal parameter we get from the url to fetch doctors by their departments
// ========================================================================================================

interface params {
    dr_department?: string;
}


interface doctor_basic_info extends RowDataPacket{
    user_id: string,
    user_fullname: string
}
// ========================================================================================================



export {login_data, user_signin_data, JWT_data, params, doctor_basic_info};