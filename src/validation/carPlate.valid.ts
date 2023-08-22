import Joi, * as joi from "joi";
import { ICarPlate } from "../@types/carPlate.type";

export const validate_carplate = (data: ICarPlate) => {
  return Joi.object({
    plateNumber: Joi.string().required().min(4),
    country: Joi.string().required().min(3),
  }).validate(data);
};

export default validate_carplate;
