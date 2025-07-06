//=================================
//? userRole 
//=================================
export enum role{
    doctor= 'doctor',
    patient = 'patient'
}

//=================================
//? userGender 
//=================================
export enum gender{
    male= 'male',
    female = 'female'
}
//=================================
//? userBloodType - optinal 
//=================================
export enum bloodTypes{
  A_Pos  = 'A+',
  A_Neg  = 'A-',
  B_Pos = 'B+',
  B_Neg  = 'B-',
  AB_Pos= 'AB+',
  AB_Neg = 'AB-',
  O_Pos  = 'O+',
  O_Neg  = 'O-',
    
}

//=================================
//? userDepartment  - optinal
//=================================
export enum departments{
    Emergency = 'Emergency',
    Cardiology ='Cardiology', 
    Neurology = 'Neurology',
    Pediatrics = 'Pediatrics', 
    Obstetrics_and_Gynecology= 'Obstetrics and Gynecology',
    Oncology= 'Oncology',
    Orthopedics= 'Orthopedics',
    Radiology= 'Radiology',
    Pathology= 'Pathology',
    GeneralSurgery	= 'General Surgery',
    Urology= 'Urology',
    Dermatology= 'Dermatology',
    Gastroenterology= 'Gastroenterology',
    Nephrology= 'Nephrology',
    Pulmonology	= 'Pulmonology',
    Psychiatry= 'Psychiatry',
    Endocrinology= 'Endocrinology',
    Rheumatology= 'Rheumatology',
    Intensive_Care_Unit= 'Intensive Care Unit',
    Infectious_Diseases	= 'Infectious Diseases',
    Ophthalmology= 'Ophthalmology',
    Otorhinolaryngology= 'Otorhinolaryngology',
    Hematology= 'Hematology',
    Physical_Medicine_and_Rehab	= 'Physical Medicine and Rehab'
}