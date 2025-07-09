//===========================================================================================================
//? Import 
//==========================================================================================================
import { Request, Response } from 'express';

//import Enums
import { role } from '../enums/userEnum';

//import User model
import User from '../models/usersModel';
//==========================================================================================================


export class UsersServices{

    //?==========================================================================================================
    //? function to fetche all doctors
    //==========================================================================================================

    async getDoctors(req: Request, res: Response):Promise<void>{
        try{
        const {doctorDepartment} = req.params; // extract the department from the URL 

            let doctors= []; // declare the doctors array
            

            // fetch the doctors from the database
            if (!doctorDepartment){
                //fetch all the doctors in the database(regardless of the department)
                doctors = await User.findAll({
                    where:{
                        userRole: role.doctor
                    },
                    attributes: ['userID', 'userName']
                });
            }else{
                //fetch the all the doctors from a specific defined department
                doctors = await User.findAll({
                    where:{
                        userRole: role.doctor,
                        userDepartment: doctorDepartment
                    },
                    attributes: ['userID', 'userName']
                });
            }


            if (doctors.length == 0) { 
                console.log("We have no doctors currently!")
                res.status(400).json({ message: "We have no doctors currently!" });
                return ;
            }

            res.status(200).json(doctors);
            return ;
    //---------------------------------------------------------------------------------------------------------------
        }catch(error){
            console.log("Error while getting the doctors, try again please");
            res.status(400).json({message: "Error while getting the doctors, try again please"});
            return;
        }

    }
}