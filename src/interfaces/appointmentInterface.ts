//======================================================================
//? Import
//======================================================================
import { ApptStatus } from "../enums/appointmentEnum";

import { RowDataPacket } from "mysql2";// import type from mysql2 for query result



// ========================================================================================================
//? define the data required for appointment
// ========================================================================================================
export interface appointmentData {
    appointmentID: string, 
    patientID?: number; 
    doctorID: number;
    appointmentDate: Date;
    appointmentTime: string;
    appointmentStatus: keyof typeof ApptStatus;
}

// ========================================================================================================
//? interface that specifies the data taken from a doctor to define and create new available appointment
// ========================================================================================================
export interface define_available_appointments extends RowDataPacket{
    appointment_date: string,
    appointment_time: string
}


// ========================================================================================================
//? interface for data we take from PATIENT(user) to view available appointments
// ========================================================================================================
export interface DataToViewAvailableAppts {
    department: string,
    appointment_date: string,
    doctor_id?: number
}



// ========================================================================================================
//? interface for data we take from PATIENT(user) to book appointment
// ========================================================================================================
export interface DataToBookAppt{
    apptID: string
}


// // ========================================================================================================
// //!inferface that show the user fullname
// // ========================================================================================================

// export interface patient_fullname  extends RowDataPacket{
//   user_fullname: string;
// }


// // ========================================================================================================
// //! interface to create appointment//!!!
// // ========================================================================================================

// export interface appointment_data extends RowDataPacket{
//     patient_id: number, 
//     appointment_date: string,
//     appointment_time: string,
//     patient_fullname?: string, // it might be added later, like in view_booked.ts
// }