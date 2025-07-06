//==============================================================================================
//? importing
//==============================================================================================
import  sequelize  from './DatabaseConnection';

// running the models for thier side-effects(for them to be added in sequelize.model )
import './models/usersModel';
import './models/appointmentsModel';
import './models/reportsModel';


//==============================================================================================
//? control all the table( build them or drop them)
//==============================================================================================

try{
    const buildModel = async () =>{
      //build all the tables
        await sequelize.sync({alter: true}); //this line looks at all the models I imported (e.x:  import './models/usersModel' etc) then it creates or alters the tables based on your model definitions
        console.log('Report Model constructured successfully');
        
      //drop all the schema
        // await sequelize.drop();
        // console.log('Schema(database) was dropped successfully')
    }

    buildModel()
}catch(error){
    console.log('Error occured: ', error);
}