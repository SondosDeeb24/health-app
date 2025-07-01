// ========================================================================================================
//? import type from mysql2 for an interface
// ========================================================================================================
import { RowDataPacket } from "mysql2";

// ========================================================================================================
//? interface for optinal parameter we get from the url to fetch doctors by their departments
// ========================================================================================================

export interface doctor_department {
    dr_department?: string;
}
// ========================================================================================================
//? interface for data we take from doctor to define new appointments
// ========================================================================================================

export interface doctor_basic_info extends RowDataPacket{
    user_id: string,
    user_fullname: string
}
