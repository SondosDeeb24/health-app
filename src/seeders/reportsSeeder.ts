// ====================================================================================================================================
//? Import
// ====================================================================================================================================

import { QueryInterface } from "sequelize";// type from Sequelize that describes the interface for running DB schema changes (migrations)

//====================================================================================================================================


export default {    

   //@param queryInterface - is Sequelize QueryInterface to interact with the DB
  async up(queryInterface: QueryInterface): Promise<void> {// runs the migration: applies the database changes(insert user to Users table). this function is called when 'sequelize db:migrate' is executed
    await queryInterface.bulkInsert("reports", [
      {
        reportID: "62f5dda1-c518-4c2c-a4a8-3cebe4d572ad",
        appointmentID: "ea95bf2d-f1c2-4075-bc80-69d88c8ca35c",
        diagnosis: "Hypertension and mild arrhythmia",
        description: "Patient presented with intermittent chest discomfort, dizziness, and palpitations over the past two weeks.",
        systolicBloodPressure: 110,
        diastolicBloodPressure: 75,
        bloodSugar: 102,
        temperature: 36.8,
        userWeight: 82,
        userHeight: 175,
        medication: "Atenolol 50mg once daily, Lisinopril 10mg once daily",
        additionalComments: "",
        reportGenerationDate: new Date(),
        reportGenerationTime: '09:30'
      },
      {
        reportID: "7bbc9399-1272-4810-b39a-1b22a9ccd4ef",
        appointmentID: "ead745ea-cc3a-4439-b5dc-1b3b6a159b1c",
        diagnosis: "Hypertension Stage 1",
        description: "Patient reported dizziness and headache.",
        systolicBloodPressure: 120,
        diastolicBloodPressure: 80,
        bloodSugar: 120,
        temperature: 37.5,
        userWeight: 70,
        userHeight: 175,
        medication: "Atenolol 50mg daily",
        additionalComments: "Follow-up recommended in 2 weeks.",
        reportGenerationDate: new Date(),
        reportGenerationTime: "12:30"
      },
    ]);
    console.log("reports  successfully inserted!");
  },
  //---------------------------------------------------------------------------------------------------------------------------------

  // @param queryInterface - Sequelize QueryInterface to interact with the DB.
  async down(queryInterface: QueryInterface): Promise<void> { // reverts the migration: undoes the changes made by `up`(remove the inserted record from the table using userID). it's called when 'sequelize db:migrate:undo;
    await queryInterface.bulkDelete("reports", {
      reportID: ['njsrthaetgerg']
    });
    console.log("reports successfully removed!");
  }
};
