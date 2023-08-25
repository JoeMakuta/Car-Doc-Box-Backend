import Joi, * as joi from "joi";
import { ICarAssurance } from "../@types/carAssurance.type";

export const validate_cartechcontrol = (data: ICarAssurance) => {
  return Joi.object({
    techControl: Joi.string().required().min(4),
    deliveryDate: Joi.date().required(),
    expirationDate: Joi.date().required(),
    photos: Joi.array().required(),
  }).validate(data);
};

export default validate_cartechcontrol;
