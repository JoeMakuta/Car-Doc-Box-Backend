import Joi, * as joi from "joi";
import { ICarType } from "../@types/carType.type";

export const validate_cartype = (data: ICarType) => {
  return Joi.object({
    typeName: Joi.string().required().min(4),
    description: Joi.string().required().min(3),
  }).validate(data);
};

export default validate_cartype;
