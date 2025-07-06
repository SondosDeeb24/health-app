// ====================================================================================================================================
//? Import
// ====================================================================================================================================

import { QueryInterface } from "sequelize";// type from Sequelize that describes the interface for running DB schema changes (migrations)

//===================================================================================================================================


// this seeder file populate the 'Users' table with initial data

export default {    

   //@param queryInterface - is Sequelize QueryInterface to interact with the DB
  async up(queryInterface: QueryInterface): Promise<void> {// runs the migration: applies the database changes(insert user to Users table). this function is called when 'sequelize db:migrate' is executed
    await queryInterface.bulkInsert("Users", [
      {
        userID: 999,
        userRole: 'doctor',
        userName: 'john',
        userGender: 'male',
        userAddress: 'gonyle',
        userPhone: '+905298298',
        userEmail: 'john@gmail.com',
        userBirthDate: '2002-05-17',
        userDepartment: 'Cardiology',
        userHashedPassword: 'john'
        // createdAt: new Date(),
        // updatedAt: new Date()
      },
      {
        userID: 444,
        userRole: 'doctor',
        userName: 'mona',
        userGender: 'male',
        userAddress: 'gonyle',
        userPhone: '+905298298',
        userEmail: 'mona@gmail.com',
        userBirthDate: '2001-05-17',
        userDepartment: 'Cardiology',
        userHashedPassword: 'mona'
        // createdAt: new Date(),
        // updatedAt: new Date()
      },
      {
        userID: 666,
        userRole: 'patient',
        userName: 'paria',
        userGender: 'female',
        userAddress: 'gonyle',
        userPhone: '+905298298',
        userEmail: 'paria@gmail.com',
        userBirthDate: '2002-05-17',
        userBloodType: 'A+',
        userHashedPassword: 'paria'
        // createdAt: new Date(),
        // updatedAt: new Date()
      },
    ]);
  },
  //---------------------------------------------------------------------------------------------------------------------------------

  // @param queryInterface - Sequelize QueryInterface to interact with the DB.
  async down(queryInterface: QueryInterface): Promise<void> { // reverts the migration: undoes the changes made by `up`(remove the inserted record from the table using userID). it's called when 'sequelize db:migrate:undo;
    await queryInterface.bulkDelete("Users", {
      userID: [444, 666, 999]
    });
    console.log("Inserted users have been successfully removed!");
  }
};
