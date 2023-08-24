import { Request, Response, NextFunction } from "express";
import * as httpError from "http-errors";
import validate_carassurance from "../validation/carAssurance.valid";
import CarAssuranceModel from "../models/carAssurance.model";
import CarModel from "../models/car.model";
import validate_car from "../validation/car.valid";
import { ICarAssurance } from "../@types/carAssurance.type";

export default class Car {
  static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const valid = validate_car(req.body);
      if (valid.error) {
        throw new httpError.Forbidden(valid.error?.details[0].message);
      } else {
        const carAssuranceResponse = await CarAssuranceModel.findByPk(
          req.body.CarAssuranceModelId
        );
        const response = await CarModel.create({
          ...req.body,
        });
        // await carAssuranceResponse?.setCarModel(response);
        if (response) {
          res.status(200).json(<IServerResponse>{
            status: 200,
            data: response,
            message: "Car Created successfully !",
            error: null,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CarModel.findAll();
      if (response) {
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "All Cars",
          data: response,
          error: null,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CarModel.findByPk(req.params.id);
      if (response) {
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "The Car",
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

  static async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const valid = validate_car(req.body);
      if (valid.error) {
        throw new httpError.Forbidden(valid.error?.details[0].message);
      } else {
        const response = await CarModel.findByPk(req.params.id);
        if (response) {
          const response1 = await response.update({ ...response, ...req.body });
          res.status(200).json(<IServerResponse>{
            status: 200,
            message: "Car updated !",
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

  static async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CarModel.findByPk(req.params.id);
      if (response) {
        await response.destroy();
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "Car Deleted !",
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
