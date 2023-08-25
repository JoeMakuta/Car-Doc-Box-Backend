import Joi, * as joi from "joi";
import { ICarAssurance } from "../@types/carAssurance.type";

export const validate_driverlicense = (data: ICarAssurance) => {
  return Joi.object({
    driverLicense: Joi.string().required().min(4),
    deliveryDate: Joi.date().required(),
    expirationDate: Joi.date().required(),
    photos: Joi.array().required(),
  }).validate(data);
};

export default validate_driverlicense;
