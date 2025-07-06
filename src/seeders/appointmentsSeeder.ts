// ====================================================================================================================================
//? Import
// ====================================================================================================================================

import { QueryInterface } from "sequelize";// type from Sequelize that describes the interface for running DB schema changes (migrations)

//====================================================================================================================================


export default {    

   //@param queryInterface - is Sequelize QueryInterface to interact with the DB
  async up(queryInterface: QueryInterface): Promise<void> {// runs the migration: applies the database changes(insert user to Users table). this function is called when 'sequelize db:migrate' is executed
    await queryInterface.bulkInsert("appointments", [
      {
        appointmentID: 'wrtywewe',
        patientID: 666,
        doctorID: 444,
        appointmentDate: '2025-11-15',
        appointmentTime: '09:30',
        appointmentStatus: 'booked',
      },

      {
        appointmentID: 'fh hwbhtr',
        patientID: 666,
        doctorID: 999,
        appointmentDate: '2025-11-17',
        appointmentTime: '08:30',
        appointmentStatus: 'booked',
      },
      {
        appointmentID: 'uopiopyilu',
        doctorID: 444,
        appointmentDate: '2025-11-14',
        appointmentTime: '10:30',
        appointmentStatus: 'available',
      },
    ]);
    console.log("appointment successfully inserted!");
  },
  //---------------------------------------------------------------------------------------------------------------------------------

  // @param queryInterface - Sequelize QueryInterface to interact with the DB.
  async down(queryInterface: QueryInterface): Promise<void> { // reverts the migration: undoes the changes made by `up`(remove the inserted record from the table using userID). it's called when 'sequelize db:migrate:undo;
    await queryInterface.bulkDelete("appointments", {
      appointmentID: ['wrtywewe']
    });
    console.log("appointment successfully removed!");
  }
};
