import Joi, * as joi from "joi";

const validate_police = (data: IPoliceAgent) => {
  return Joi.object({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    surName: Joi.string().required().min(3),
    gender: Joi.string().valid("F", "M"),
    email: Joi.string().required().email(),
    phone: Joi.array().items(Joi.string()),
    username: Joi.string().required().min(3),
    password: Joi.string().required().min(6),
    birthDate: Joi.date().required(),
    photos: Joi.array().items(Joi.string()),
    address: Joi.array().items(Joi.string()),
    role: Joi.number().valid(1, 2, 3),
    policeLicense: Joi.string().required(),
  }).validate(data);
};

export default validate_police;
