import { Request, Response, NextFunction } from "express";
import * as httpError from "http-errors";
import PoliceAgentModel from "../models/policeAgent.model";
import validate_police, {
  validate_login,
} from "../validation/policeAgent.valid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validate_carplate from "../validation/carPlate.valid";
import CarPlateModel from "../models/carPlate.model";

dotenv.config();

const { TOKEN_SECRET, TOKEN_EXPIRES_IN } = process.env;

export default class CarPlate {
  static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const valid = validate_carplate(req.body);
      if (valid.error) {
        throw new httpError.Forbidden(valid.error.details[0].message);
      } else {
        const response = await CarPlateModel.create({
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

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CarPlateModel.findAll();
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

  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CarPlateModel.findByPk(req.params.id);
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

  static async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const valid = validate_carplate(req.body);
      if (valid.error) {
        throw new httpError.Forbidden(valid.error.details[0].message);
      } else {
        const response = await CarPlateModel.findByPk(req.params.id);
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

  static async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CarPlateModel.findByPk(req.params.id);
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
