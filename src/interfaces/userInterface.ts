//======================================================================
//? Import
//======================================================================

import {role, gender, bloodTypes, departments} from '../enums/userEnum';

//======================================================================
//? interfaces for userAttribute  
//======================================================================
export interface userAttributes  {
  userID: number;
  userRole: keyof typeof role; //keyof typeof: accepts only values from your enum, that's why we use it rather than a string
  userName: string; 
  userGender: keyof typeof gender;
  userAddress: string;
  userPhone: string;
  userEmail: string;
  userBirthDate: Date;
  userBloodType?: typeof bloodTypes[keyof typeof bloodTypes];// so it excepts "A+" | "A-" | ...
  userDepartment?: typeof departments[keyof typeof departments];
  userHashedPassword: string;
}
