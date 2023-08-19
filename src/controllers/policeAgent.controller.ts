import express, { response } from "express";
import { Request, Response, NextFunction } from "express";
import * as httpError from "http-errors";
import PoliceAgentModel from "../models/policeAgent.model";
import validate_police from "../validation/policeAgent.valid";

export default class PoliceAgent {
  // static async home(req: Request, res: Response, next: NextFunction) {
  //   res.json(<IServerResponse>{
  //     status: 200,
  //     data: null,
  //     message: "Police Agent : Home",
  //     error: null,
  //   });
  // }

  static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const valid = validate_police(req.body);
      if (valid.error) {
        throw new httpError.Forbidden(valid.error.details[0].message);
      } else {
        const response = await PoliceAgentModel.create({
          ...req.body,
        });
        if (response) {
          res.status(200).json(<IServerResponse>{
            status: 200,
            data: { ...req.body },
            message: "Police Agent created successfully",
            error: null,
          });
        }
      }
    } catch (error) {
      res.status(500).json(<IServerResponse>{
        status: 500,
        message: "error",
        data: null,
        error: error,
      });
      // throw new httpError.Conflict("Une erreur est servenu !");
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PoliceAgentModel.findAll();
      if (response) {
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "All Police Agents",
          data: response,
          error: null,
        });
      }
    } catch (error) {
      res.status(500).json(<IServerResponse>{
        status: 500,
        data: null,
        message: "error",
        error: error,
      });
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PoliceAgentModel.findByPk(req.params.id);
      if (response) {
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "The Agent",
          data: response,
          error: null,
        });
      } else {
        throw new httpError.NotFound();
      }
    } catch (error) {
      res.status(500).json(<IServerResponse>{
        status: 500,
        data: null,
        message: "error",
        error: error,
      });
    }
  }

  static async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const valid = validate_police(req.body);
      if (valid.error) {
        throw new httpError.Forbidden(valid.error.details[0].message);
      } else {
        let response = await PoliceAgentModel.findByPk(req.params.id);
        if (response) {
          response = { ...response, ...req.body };
          const response1 = await response?.save();
          // const response1 = await PoliceAgentModel.update(response, {
          //   ...req.body,
          // });
          res.status(200).json(<IServerResponse>{
            status: 200,
            message: "Agent updated !",
            data: response1,
            error: null,
          });
        } else {
          throw new httpError.NotFound();
        }
      }
    } catch (error) {
      res.status(500).json(<IServerResponse>{
        status: 500,
        data: null,
        message: "error",
        error: error,
      });
    }
  }

  static async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PoliceAgentModel.findByPk(req.params.id);
      if (response) {
        const response1 = response.destroy();
        if (response1)
          res.status(200).json(<IServerResponse>{
            status: 200,
            message: "Agent Deleted !",
            data: response1,
            error: null,
          });
      } else {
        throw new httpError.NotFound();
      }
    } catch (error) {
      res.status(500).json(<IServerResponse>{
        status: 500,
        data: null,
        message: "error",
        error: error,
      });
    }
  }
}
