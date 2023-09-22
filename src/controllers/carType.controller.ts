import { Request, Response, NextFunction } from "express";
import * as httpError from "http-errors";
import validate_carplate from "../validation/carPlate.valid";
import CarPlateModel from "../models/carPlate.model";
import validate_cartype from "../validation/carType.valid";
import CarTypeModel from "../models/carType.model";
import { IUserRequest } from "../@types/user.type";

export default class CarType {
  static async add(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const valid = validate_cartype(req.body);
      if (valid.error) {
        throw new httpError.Forbidden(valid.error.details[0].message);
      } else {
        const response = await CarTypeModel.create({
          ...req.body,
        });
        if (response) {
          res.status(200).json(<IServerResponse>{
            status: 200,
            data: response,
            message: "Plate Created successfully !",
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
      const response = await CarTypeModel.findAll();
      if (response) {
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "All Car plates",
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
      const response = await CarTypeModel.findByPk(req.params.id);
      if (response) {
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "The Car Plate",
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
      const valid = validate_cartype(req.body);
      if (valid.error) {
        throw new httpError.Forbidden(valid.error.details[0].message);
      } else {
        const response = await CarTypeModel.findByPk(req.params.id);
        if (response) {
          const response1 = await response.update({ ...response, ...req.body });
          res.status(200).json(<IServerResponse>{
            status: 200,
            message: "Car Plate updated !",
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
      const response = await CarTypeModel.findByPk(req.params.id);
      if (response) {
        await response.destroy();
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "Car Plate Deleted !",
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
