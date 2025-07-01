// ========================================================================================================
//? import type from mysql2 for query result
// ========================================================================================================
import { RowDataPacket } from "mysql2";

// ========================================================================================================
//? interface that specifies the data taken from a doctor to define and create new available appointment
// ========================================================================================================


export interface define_available_appointments extends RowDataPacket{
    appointment_date: string,
    appointment_time: string
}

