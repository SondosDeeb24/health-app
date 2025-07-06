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
        reportID: 'njsrthaetgerg',
        appointmentID: 'wrtywewe',
        diagnosis: 'Hypertension Stage 1',
        description: 'Patient reported dizziness and headache.',
        bloodPressure: '135/85',
        bloodSugar: '120 mg/dL',
        temperature: 37.5,
        userWeight: 70,
        userHeight: 175,
        medication: 'Atenolol 50mg daily',
        additionalComments: 'Follow-up recommended in 2 weeks.',
        reportGenerationDate: new Date(),
        reportGenerationTime: '09:30'
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
