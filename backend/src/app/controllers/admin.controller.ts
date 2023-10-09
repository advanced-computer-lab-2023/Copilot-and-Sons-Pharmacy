import { Request, Response } from 'express';
import {SUCCESS,FAIL,ERROR} from '../utils/httpStatusText'
import asyncWrapper from '../middlewares/asyncWrapper';
import { addAdminService } from '../services/addAdmin.service';
const Pharmacist = require('../schemas/pharmacist');
const { ObjectId } = require('mongodb')
const Joi = require('joi');
import {getPatientByUsername} from '../services/adminViewsPatientInfo';

export const adminViewsPatientInfo =async (req:Request, res: Response) => {
    const patient = await  getPatientByUsername(req.body.username);
    res.json({success: SUCCESS, data: patient});
    console.log(patient);
}
export const addAdmin = asyncWrapper( async ( req: Request,res: Response) => { 
    const admin = await addAdminService(req.body);
    res.json({ success: SUCCESS, data: admin });
})


export const getAllPharmacists = async (req: Request, res: Response) => {
    Pharmacist.find() 
      .sort({ createdAt: -1 })
      .then((result: any[]) => { 
        res.send(result);
      })
      .catch((err: Error) => {
        console.log(err);
      });
};





export const getPendingPharmacists = async (req: Request, res: Response) => {
    Pharmacist.find({status: "Pending"}) 
    .sort({ createdAt: -1 })
    .then((result: any[]) => { 
      res.send(result);
    })
    .catch((err: Error) => { 
      console.log(err);
    });
};




export const getPharmacistByID = async (req: Request, res: Response) => {
    if (ObjectId.isValid(req.params.id)) {
        Pharmacist.findById(req.params.id)
          .then((result: any) => {
            res.send(result);
          })
          .catch((err: Error) => {
            console.log(err);
          });
        } else {
          res.status(400).send("Invalid ID");
        }
};


