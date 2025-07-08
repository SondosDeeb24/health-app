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
        userID: 52097494,
        userRole: 'doctor',
        userName: 'john chalopen',
        userGender: 'male',
        userAddress: 'gonyle',
        userPhone: '+905298298',
        userEmail: 'john@gmail.com',
        userBirthDate: '2002-05-17',
        userDepartment: 'Emergency',
        userHashedPassword: '$2b$08$hLLXN.Sd9ezYwW.KoM/goOp0ghEBFB7tHjnm7gNsfenu92pXCukzm'
      },
      {
        userID: 60085985,
        userRole: 'doctor',
        userName: 'nicole sabby',
        userGender: 'male',
        userAddress: 'gonyle',
        userPhone: '+905298298',
        userEmail: 'nicole@gmail.com',
        userBirthDate: '2001-05-17',
        userDepartment: 'Cardiology',
        userHashedPassword: '$2b$08$ugCEs8i/ejeL8YNdmplH1O7dtUmzyIr4GCNfzdtWZZ8iCJ.l8YKJq'
      },
      {
        userID: 12547898,
        userRole: 'doctor',
        userName: 'tiana antonaole',
        userGender: 'female',
        userAddress: 'gonyle',
        userPhone: '+905298298',
        userEmail: 'tiana@gmail.com',
        userBirthDate: '2002-05-17',
        userDepartment: 'Cardiology',
        userHashedPassword: '$2b$08$y9irsv4cSLs6f4CCvjsVPOkMNPoSr7qdqobI38vWYSjvKf.LoBKYi'
      },
      {
        userID: 42413365,
        userRole: 'patient',
        userName: 'lara',
        userGender: 'female',
        userAddress: 'gonyle',
        userPhone: '+90457764',
        userEmail: 'lara@gmail.com',
        userBirthDate: '2000-02-22',
        userBloodType: 'A+',
        userHashedPassword: '$2b$08$JePJLlEfYvCICwJCFAm1cu8oDcQjaX0NuWdCRgqJdchWFz3BByH8u'
      },
        {
        userID: 65985412,
        userRole: 'patient',
        userName: 'morgan ferman',
        userGender: 'male',
        userAddress: 'gonyle',
        userPhone: '+90457764',
        userEmail: 'morgan@gmail.com',
        userBirthDate: '2001-02-22',
        userBloodType: 'B+',
        userHashedPassword: '$2b$08$82oHl4rDBlRcRFTw65lVxOll6HL8UZY0pQXQGSAD69fW/KFTj9K8S'
      },
    ]);
  },
  //---------------------------------------------------------------------------------------------------------------------------------

  // @param queryInterface - Sequelize QueryInterface to interact with the DB.
  async down(queryInterface: QueryInterface): Promise<void> { // reverts the migration: undoes the changes made by `up`(remove the inserted record from the table using userID). it's called when 'sequelize db:migrate:undo;
    await queryInterface.bulkDelete("Users", {
      userID: [63831988, 444, 666, 999]//[52097494, 60085985, 22192181, 42413365, 52097494]
    });
    console.log("Inserted users have been successfully removed!");
  }
};
