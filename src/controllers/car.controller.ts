import { Request, Response, NextFunction } from "express";
import * as httpError from "http-errors";
import validate_carassurance from "../validation/carAssurance.valid";
import CarAssuranceModel from "../models/carAssurance.model";
import CarModel from "../models/car.model";
import validate_car from "../validation/car.valid";
import { ICarAssurance } from "../@types/carAssurance.type";
import CarStickerModel from "../models/carSticker.model";
import CarPlateModel from "../models/carPlate.model";
import CarPinkCardModel from "../models/carPinkCard.model";
import CarTechControlModel from "../models/carTechControl.model";
import CarTypeModel from "../models/carType.model";
import CarOwnerModel from "../models/carOwner.model";
import { IUserRequest } from "../@types/user.type";
import PoliceAgentModel from "../models/policeAgent.model";

export default class Car {
  static async add(req: IUserRequest, res: Response, next: NextFunction) {
    const {
      chassisNumber,
      CarTypeId,
      carBrand,
      CarPlateId,
      CarTechControlId,
      photos,
      CarStickerId,
      CarPinkCardId,
      CarOwnerId,
      CarAssuranceId,
    } = req.body;
    try {
      const valid = validate_car(req.body);
      if (valid.error) {
        throw new httpError.Forbidden(valid.error?.details[0].message);
      } else {
        const itExists = await CarModel.findOne({
          where: {
            chassisNumber,
          },
        });
        if (itExists) {
          throw new httpError.Forbidden("The chassis number already exists!");
        }

        const carAssuranceResponse: any = await CarAssuranceModel.findByPk(
          CarAssuranceId
        );
        if (!carAssuranceResponse)
          throw new httpError.NotFound("Car Assurance not found !");

        const carStickerResponse: any = await CarStickerModel.findByPk(
          CarStickerId
        );
        if (!carStickerResponse)
          throw new httpError.NotFound("Car Sticker not found !");

        const carPlateResponse: any = await CarPlateModel.findByPk(CarPlateId);
        if (!carPlateResponse)
          throw new httpError.NotFound("Car Plate not found !");

        const carPinkCardResponse: any = await CarPinkCardModel.findByPk(
          CarPinkCardId
        );
        if (!carPinkCardResponse)
          throw new httpError.NotFound("Pink card not found !");

        const carTechControlResponse: any = await CarTechControlModel.findByPk(
          CarTechControlId
        );
        if (!carTechControlResponse)
          throw new httpError.NotFound("Tech control not found !");

        const carTypeResponse: any = await CarTypeModel.findByPk(CarTypeId);
        if (!carTypeResponse)
          throw new httpError.NotFound("Car Type not found !");

        const carOwnerResponse: any = await CarOwnerModel.findByPk(CarOwnerId);
        if (!carOwnerResponse)
          throw new httpError.NotFound("Car Owner not found !");

        const response = await req.auth.createCarModel({
          chassisNumber,
          carBrand,
          photos,
        });

        if (response) {
          await carAssuranceResponse?.setCarModel(response);
          await carStickerResponse?.setCarModel(response);
          await carPlateResponse?.setCarModel(response);
          await carTechControlResponse?.setCarModel(response);
          await carOwnerResponse?.setCarModel(response);
          await carPinkCardResponse?.setCarModel(response);
          await carTypeResponse?.setCarModel(response);

          res.status(200).json(<IServerResponse>{
            status: 200,
            data: response,
            message: "Car Created successfully !",
            error: null,
          });
        } else throw new httpError.NotFound("Admin not found !");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAll(req: IUserRequest, res: Response, next: NextFunction) {
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

  static async getOne(req: IUserRequest, res: Response, next: NextFunction) {
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

  static async updateOne(req: IUserRequest, res: Response, next: NextFunction) {
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

  static async deleteOne(req: IUserRequest, res: Response, next: NextFunction) {
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
