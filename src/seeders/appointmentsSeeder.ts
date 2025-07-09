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
        appointmentID: '1251e068-09f1-44ee-a06d-bcec997f42ad',
        doctorID: 52097494,
        patientID: 42413365,
        appointmentDate: '2025-07-15',
        appointmentTime: '15:30',
        appointmentStatus: 'booked',
      },
      {
        appointmentID: '140e5069-9f33-41c8-8b6b-71f974ce26de',
        doctorID: 52097494,
        appointmentDate: '2025-07-15',
        appointmentTime: '13:30',
        appointmentStatus: 'available',
      },
      {
        appointmentID: '7ba3324f-3436-4a4d-8a93-dde5e7cc39d5',
        doctorID: 12547898,
        appointmentDate: '2025-07-15',
        appointmentTime: '11:30',
        appointmentStatus: 'available',
      },
      {
        appointmentID: 'b5f86873-ab30-4bef-8cbd-b5b22da5033b',
        doctorID: 12547898,
        appointmentDate: '2025-07-15',
        appointmentTime: '09:30',
        appointmentStatus: 'available',
      },
      {
        appointmentID: '02a819c8-db69-4139-870b-4e199ed578d3',
        doctorID: 52097494,
        appointmentDate: '2025-07-16',
        appointmentTime: '14:30',
        appointmentStatus: 'available',
      },
      {
        appointmentID: 'fb51a4a7-28e4-4ea1-b67c-2eca01a003f1',
        doctorID: 12547898,
        appointmentDate: '2025-07-16',
        appointmentTime: '13:30',
        appointmentStatus: 'available',
      },
      {
        appointmentID: '79a2a636-988f-41a8-81b7-11f0b6423faf',
        doctorID: 12547898,
        appointmentDate: '2025-07-17',
        appointmentTime: '10:30',
        appointmentStatus: 'available',
      },
      {
        appointmentID: 'ea95bf2d-f1c2-4075-bc80-69d88c8ca35c',
        doctorID: 60085985,
        patientID: 42413365,
        appointmentDate: '2025-07-17',
        appointmentTime: '14:30',
        appointmentStatus: 'booked',
      },
      {
        appointmentID: 'ead745ea-cc3a-4439-b5dc-1b3b6a159b1c',
        doctorID: 60085985,
        patientID: 65985412,
        appointmentDate: '2025-07-17',
        appointmentTime: '16:30',
        appointmentStatus: 'booked',
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
