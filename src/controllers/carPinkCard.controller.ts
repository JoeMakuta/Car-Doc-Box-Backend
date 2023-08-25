import { Request, Response, NextFunction } from "express";
import * as httpError from "http-errors";
import validate_carpinkcard from "../validation/carPinkCard.valid";
import CarPinkCardModel from "../models/carPinkCard.model";

export default class CarPinkCard {
  static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const valid = validate_carpinkcard(req.body);
      if (valid.error) {
        throw new httpError.Forbidden(valid.error.details[0].message);
      } else {
        const response = await CarPinkCardModel.create({
          ...req.body,
        });
        if (response) {
          res.status(200).json(<IServerResponse>{
            status: 200,
            data: response,
            message: "Pink Card Created successfully !",
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
      const response = await CarPinkCardModel.findAll();
      console.log("The response : ", response[0]);
      if (response) {
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "All Car Pink cards",
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
      const response = await CarPinkCardModel.findByPk(req.params.id);
      if (response) {
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "The Car Pink Card",
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
      const valid = validate_carpinkcard(req.body);
      if (valid.error) {
        throw new httpError.Forbidden(valid.error.details[0].message);
      } else {
        const response = await CarPinkCardModel.findByPk(req.params.id);
        if (response) {
          const response1 = await response.update({ ...response, ...req.body });
          res.status(200).json(<IServerResponse>{
            status: 200,
            message: "Pink Card updated !",
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
      const response = await CarPinkCardModel.findByPk(req.params.id);
      if (response) {
        await response.destroy();
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "Pink Card Deleted !",
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
