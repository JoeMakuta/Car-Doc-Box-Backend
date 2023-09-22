import { Request, Response, NextFunction } from "express";
import * as httpError from "http-errors";
import validate_carpinkcard from "../validation/carPinkCard.valid";
import CarPinkCardModel from "../models/carPinkCard.model";
import validate_cartechcontrol from "../validation/carTechControl.valid";
import CarTechControlModel from "../models/carTechControl.model";
import { IUserRequest } from "../@types/user.type";

export default class CarTechControl {
  static async add(req: IUserRequest, res: Response, next: NextFunction) {
    try {
      const valid = validate_cartechcontrol(req.body);
      if (valid.error) {
        throw new httpError.Forbidden(valid.error.details[0].message);
      } else {
        const response = await CarTechControlModel.create({
          ...req.body,
        });
        if (response) {
          res.status(200).json(<IServerResponse>{
            status: 200,
            data: response,
            message: "Car tech control Created successfully !",
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
      const response = await CarTechControlModel.findAll();
      if (response) {
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "All Car Tech control",
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
      const response = await CarTechControlModel.findByPk(req.params.id);
      if (response) {
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "The Car Tech Control",
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
      const valid = validate_cartechcontrol(req.body);
      if (valid.error) {
        throw new httpError.Forbidden(valid.error.details[0].message);
      } else {
        const response = await CarTechControlModel.findByPk(req.params.id);
        if (response) {
          const response1 = await response.update({ ...response, ...req.body });
          res.status(200).json(<IServerResponse>{
            status: 200,
            message: "Tech Control updated !",
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
      const response = await CarTechControlModel.findByPk(req.params.id);
      if (response) {
        await response.destroy();
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "Tech Control Deleted !",
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
