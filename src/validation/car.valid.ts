import Joi, * as joi from "joi";
import { ICarAssurance } from "../@types/carAssurance.type";

export const validate_car = (data: ICarAssurance) => {
  return Joi.object({
    chassisNumber: Joi.string().required().min(4),
    carBrand: Joi.string().required().min(3),
    photos: Joi.array().items(Joi.string()),
    CarAssuranceModelId: Joi.string(),
  }).validate(data);
};

export default validate_car;
