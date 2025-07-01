// ========================================================================================================
//? import
// ========================================================================================================
import { RowDataPacket } from "mysql2";

// ========================================================================================================
//? interface to create appointment
// ========================================================================================================

export interface appointment_data extends RowDataPacket{
    patient_id: number, 
    appointment_date: string,
    appointment_time: string,
    patient_fullname?: string, // it might be added later, like in view_booked.ts
}