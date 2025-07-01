// ========================================================================================================
//? interface for data we take from user to book an appointment
// ========================================================================================================
export interface patient_make_appointment {
    department: string,
    appointment_date: string,
    doctor_id?: number
}

