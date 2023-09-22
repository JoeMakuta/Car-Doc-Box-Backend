import { Request, Response, NextFunction } from "express";
import * as httpError from "http-errors";

import dotenv from "dotenv";
import validate_carowner from "../validation/carOwner.valid";
import CarOwnerModel from "../models/carOwner.model";
import DriverLicenseModel from "../models/driverLicense.model";
import { IUserRequest } from "../@types/user.type";

dotenv.config();

const { TOKEN_SECRET, TOKEN_EXPIRES_IN } = process.env;

export default class CarOwner {
  static async add(req: IUserRequest, res: Response, next: NextFunction) {
    const {
      firstName,
      lastName,
      surName,
      gender,
      email,
      phone,
      username,
      password,
      birthDate,
      photos,
      address,
      nationalId,
      role,
    } = req.body;
    try {
      const valid = validate_carowner(req.body);
      if (valid.error) {
        throw new httpError.Forbidden(valid.error.details[0].message);
      } else {
        const driverLicenseResponse: any = await DriverLicenseModel.findByPk(
          req.body.DriverLicenseId
        );
        if (!driverLicenseResponse)
          throw new httpError.NotFound("The driver license can't be found !");

        const response = await req.auth?.createCarOwnerModel({
          firstName,
          lastName,
          surName,
          gender,
          email,
          phone,
          username,
          password,
          birthDate,
          photos,
          address,
          nationalId,
          role,
        });

        if (response) {
          const isOk = await driverLicenseResponse.setCarOwnerModel(response);

          res.status(200).json(<IServerResponse>{
            status: 200,
            data: response,
            message: "Car Owner created successfully",
            error: null,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const response = await CarOwnerModel.findAll();
      if (response) {
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "All Car Owners",
          data: response,
          error: null,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const response = await CarOwnerModel.findByPk(req.params.id);
      if (response) {
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "The Car owner",
          data: response,
          error: null,
        });
      } else {
        throw new httpError.NotFound();
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateOne(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const valid = validate_carowner(req.body);
      if (valid.error) {
        throw new httpError.Forbidden(valid.error.details[0].message);
      } else {
        const response = await CarOwnerModel.findByPk(req.params.id);
        if (response) {
          const response1 = await response.update({ ...response, ...req.body });
          res.status(200).json(<IServerResponse>{
            status: 200,
            message: "Car Owner updated !",
            data: response1,
            error: null,
          });
        } else {
          throw new httpError.NotFound();
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteOne(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const response = await CarOwnerModel.findByPk(req.params.id);
      if (response) {
        await response.destroy();
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "Car Owner Deleted !",
          data: {},
          error: null,
        });
      } else {
        throw new httpError.NotFound();
      }
    } catch (error) {
      next(error);
    }
  }
}
