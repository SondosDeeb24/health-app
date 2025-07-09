//======================================================================
//?Interface for the report data
//======================================================================

export interface reportData{
    reportID?: string,
    appointmentID: string, 
    diagnosis: string,
    description: string,
    systolicBloodPressure:number;
    diastolicBloodPressure: number;
    bloodSugar: number,
    temperature: number,
    userWeight: number,
    userHeight: number, 
    medication: string,
    additionalComments: string, 
    reportGenerationDate: Date,
    reportGenerationTime: string
}
