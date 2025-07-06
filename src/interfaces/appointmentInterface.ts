//======================================================================
//? Import
//======================================================================
import { status } from "../enums/appointmentEnum";

export interface appointmentData {
    appointmentID: string, 
    patientID: number;
    doctorID: number;
    appointmentDate: Date;
    appointmentTime: string;
    appointmentStatus: keyof typeof status;

}