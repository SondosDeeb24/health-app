//===========================================================================================================
//? Import 
//==========================================================================================================
import { Request, Response } from 'express';

//import services class for reports
import { ReportsServices } from '../services/reportsServices';

const reportsServices = new ReportsServices();
//==========================================================================================================

export class ReportsController{

    //==========================================================================================================
    // functio to create reports 
    //==========================================================================================================

    async createReport(req: Request, res: Response): Promise<void>{
        return reportsServices.createReport(req, res);
    };

}