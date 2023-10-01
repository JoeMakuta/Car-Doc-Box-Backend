import Joi, * as joi from "joi";
import { ICarAssurance } from "../@types/carAssurance.type";

export const validate_car = (data: ICarAssurance) => {
  return Joi.object({
    chassisNumber: Joi.string().required().min(4),
    carBrand: Joi.string().required().min(3),
    photos: Joi.array().items(Joi.string()),
    CarAssuranceId: Joi.string().required(),
    CarStickerId: Joi.string().required(),
    CarTechControlId: Joi.string().required(),
    CarPlateId: Joi.string().required(),
    CarPinkCardId: Joi.string().required(),
    CarTypeId: Joi.string().required(),
    CarOwnerId: Joi.string().required(),
    // adminId: Joi.string().required(),
  }).validate(data);
};

export default validate_car;
