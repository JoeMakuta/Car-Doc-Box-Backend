import Joi, * as joi from "joi";
import { ICarAssurance } from "../@types/carAssurance.type";

export const validate_carassurance = (data: ICarAssurance) => {
  return Joi.object({
    assurance: Joi.string().required().min(4),
    deliveryDate: Joi.date().required(),
    expirationDate: Joi.date().required(),
    photos: Joi.array().required(),
  }).validate(data);
};

export default validate_carassurance;
