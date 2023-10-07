import { Request, Response ,NextFunction} from 'express';
import registerService  from '../services/register.service';
import { FAIL, SUCCESS } from '../utils/httpStatusText';
import asyncWrapper from '../middlewares/asyncWrapper';
const Pharmacist = require('../schemas/pharmacist');
const Joi = require('joi');

export const registerController = asyncWrapper( async (req:Request, res:Response, next:NextFunction) => {

const patient=await registerService(req.body);
res.status(201).json({status:SUCCESS,data:patient})

}
)

export const addPharmacist = async (req: Request, res: Response) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required().messages({
            'string.min': `Name must be at least 3 characters long`,
            'string.max': `Name must be less than or equal to 30 characters long`,
            'string.empty': `Name cannot be an empty field`,
            'any.required': `Name is a required field`,
          }),
        email: Joi.string().required().email().messages({
            'string.email': `Email must be a valid email`,
            'string.empty': `Email cannot be an empty field`,
            'any.required': `Email is a required field`,
            // 'any.unique': `Email must be unique`,
          }),
        username: Joi.string().alphanum().min(3).max(30).required().messages({
            'string.min': `Username must be at least 3 characters long`,
            'string.max': `Username must be less than or equal to 30 characters long`,
            'string.empty': `Username cannot be an empty field`,
            'any.required': `Username is a required field`,
            // 'any.unique': `Username must be unique`,
            'string.alphanum': `Username must only contain alpha-numeric characters`,
    
          }),
       password: Joi.string()
      .min(3)
      .max(30)
      .required()
      .messages({
    
        'string.min': `Password must be at least 3 characters long`,
        'string.max': `Password must be less than or equal to 30 characters long`,
        'string.empty': `Password cannot be an empty field`,
        'any.required': `Password is a required field`,
      }),
    
        dateOfBirth: Joi.date().required().messages({
            'date.base': `Date of birth must be a valid date`,
            'date.empty': `Date of birth cannot be an empty field`,
            'any.required': `Date of birth is a required field`,
          }),
        hourlyRate: Joi.number().required().messages({
            'number.base': `Hourly rate must be a valid number`,
            'number.empty': `Hourly rate cannot be an empty field`,
            'any.required': `Hourly rate is a required field`,
          }),
    
        affilation: Joi.string().required().messages({
    
            'string.empty': `Affilation cannot be an empty field`,
            'any.required': `Affilation is a required field`,
          }),
    
        status: Joi.string().valid("Accepted", "Rejected" , "Pending").required().messages({
            "any.only": `Status must be one of the following values: Accepted, Rejected, Pending`
        }),
        educationalBackground: {
            major: Joi.string().required().messages({
                'string.empty': `Major cannot be an empty field`,
                'any.required': `Major is a required field`,
              }),
            university: Joi.string().required().messages({
                'string.empty': `University cannot be an empty field`,
                'any.required': `University is a required field`,
              }),
            graduationYear: Joi.number().required()
            .messages({
                'number.base': `Graduation year must be a valid number`,
                'number.empty': `Graduation year cannot be an empty field`,
                'any.required': `Graduation year is a required field`,
              }),
            degree: Joi.string().valid("Associate degree", "Bachelor's degree", "Master's degree",
             "Doctoral degree").required().messages({
                "any.only": `Degree must be one of the following values: Associate degree, Bachelor's degree, Master's degree, Doctoral degree`
            }),
        },
    
    
      });
    
      const result = schema.validate(req.body);
      if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
      }
     
     
        
   const pharmacist = req.body;
      const newPharmacist = new Pharmacist(pharmacist);
      newPharmacist.save()
        .then((result: any) => {
          res.send(result);
        })
        .catch((err: Error) => {
          console.log(err);
        });
}; 

