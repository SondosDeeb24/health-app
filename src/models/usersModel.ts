//======================================================================================================================
//?  Imports
//======================================================================================================================
import {Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../DatabaseConnection';

import {role, gender, bloodTypes, departments,} from '../enums/userEnum';

import { userAttributes } from '../interfaces/userInterface';


//==============================================================================================================================================
//? Model class
//==============================================================================================================================================
class User extends Model< InferAttributes<User>, InferCreationAttributes<User> > implements userAttributes { 
  // the two generic defined help in illustrating which fileds exist in DB, and which ones are optional or default when creating  a new reacord (specially the second type allow us to skip auto-generated or default columns whe creating new record)
  
  //declaring the propeties for User class. it's values will be assinged by sequelize at runtime
  declare userID: number;
  declare userRole: keyof typeof role;
  declare userName: string;
  declare userGender: keyof typeof gender;
  declare userAddress: string;
  declare userPhone: string;
  declare userEmail: string;
  declare userBirthDate: Date;
  declare userBloodType?: typeof bloodTypes[keyof typeof bloodTypes];;
  declare userDepartment?: keyof typeof departments;
  declare userHashedPassword: string;
}

//======================================================================================================================
//? Initialize the table
//======================================================================================================================
User.init( {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    userRole: {
      type: DataTypes.ENUM(...Object.values(role) as string[]),
      allowNull: false
    },
    userName: { type: DataTypes.STRING(30),
      allowNull: false
    },
    userGender: {
      type: DataTypes.ENUM(...Object.values(gender) as string[]),
      allowNull: false
    },
    userAddress: { 
      type: DataTypes.STRING(50),
      allowNull: false
    },
    userPhone: { 
      type: DataTypes.STRING(50) ,
      allowNull: false},
    userEmail: { 
      type: DataTypes.STRING(50) ,
      allowNull: false},
    userBirthDate: { 
      type: DataTypes.DATE ,
      allowNull: false},
    userBloodType: {
      type: DataTypes.ENUM(...Object.values(bloodTypes) as string[])
    },
    userDepartment: {
      type: DataTypes.ENUM(...Object.values(departments) as string[])
    },
    userHashedPassword: { 
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    sequelize,// to attach the User model to the database connection i've defined in databaseConnection.ts
    tableName: 'users',
    timestamps: false, // it creates  createdAt / updatedAt columns
  }
);

// !!!!-------------------------------------------------------------------------------------------------------------------------
//====================================================================================================================================
//? function for building the table and adding one user
//======================================================================================================================================

//!!
// async function insertTable() {
//   try {
//     await User.sync({ force: true });// adding the new table, if a table already exists in DB, we drop it then add the new one
//     console.log('users Table and model synced successfully');

//     //-------------------------------------------------------------------------------------
//     // add new user to the system 
//     //!
//     // const user1 = await User.bulkCreate([
//     //   {
//     //     userID: 989,
//     //     userRole: 'doctor',
//     //     userName: 'Lily',
//     //     userGender: 'female',
//     //     userAddress: 'Gonyle',
//     //     userPhone: '+90000',
//     //     userEmail: 'slf@dfj.com',
//     //     userBirthDate: new Date('2025-02-12'),
//     //     userDepartment: "Cardiology",
//     //     userHashedPassword: 'lily'
//     //   },
//     //   {
//     //     userID: 444,
//     //     userRole: 'patient',
//     //     userName: 'Sara',
//     //     userGender: 'female',
//     //     userAddress: 'Gonyle',
//     //     userPhone: '+90000',
//     //     userEmail: 'sara@dfj.com',
//     //     userBloodType: bloodTypes.B_Neg,
//     //     userBirthDate: new Date('2002-02-12'),
//     //     userHashedPassword: 'Sara'
//     //   }
//     // ]);
//     //=============================================================================
//   } catch (error) {
//     console.error('Error syncing users table:', error);
//   }
// }
// //======================================================================================================================================
// // call the function to build the table and add user
// // insertTable();
// //======================================================================================================================================

// async function showUsers() {
//   const rows = await User.min('userID');

//   console.log(rows);    // ← now you’ll see real values
// }


// //======================================================================================================================================
// async function main() {
//   await insertTable();   // Ensure table is created and data inserted
//  //!
//   //await showUsers();     // Now you can safely read from it
// }
// //!
// //main(); // ← run both in correct order
// //======================================================================================================================================

export default User;
