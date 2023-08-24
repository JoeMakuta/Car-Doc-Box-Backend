import { Request, Response, NextFunction } from "express";
import * as httpError from "http-errors";
import PoliceAgentModel from "../models/policeAgent.model";
import validate_police, {
  validate_login,
} from "../validation/policeAgent.valid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { where } from "sequelize";
import { IPoliceAgent } from "../@types/user.type";

dotenv.config();

const { TOKEN_SECRET, TOKEN_EXPIRES_IN } = process.env;

export default class PoliceAgent {
  static addDefaultUser = async () => {
    const body: IPoliceAgent = JSON.parse(process.env.DEFAULT_USER as string);
    const salt: string = await bcrypt.genSalt(10);
    const password: string = await bcrypt.hash(body.password, salt);
    try {
      const Response = await PoliceAgentModel.create({ ...body, password });
      console.log("Default user created successfully !");
    } catch (error) {
      console.log("The default user does already exist");
    }
  };
  static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const valid = validate_police(req.body);
      if (valid.error) {
        throw new httpError.Forbidden(valid.error.details[0].message);
      } else {
        const salt: string = await bcrypt.genSalt(10);
        const password: string = await bcrypt.hash(req.body.password, salt);

        const response = await PoliceAgentModel.create({
          ...req.body,
          password,
        });
        if (response) {
          res.status(200).json(<IServerResponse>{
            status: 200,
            data: response,
            message: "Police Agent created successfully",
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
      next(error);
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
      next(error);
    }
  }

  static async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const valid = validate_police(req.body);
      if (valid.error) {
        throw new httpError.Forbidden(valid.error.details[0].message);
      } else {
        const response = await PoliceAgentModel.findByPk(req.params.id);
        if (response) {
          const response1 = await response.update({ ...response, ...req.body });
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
      next(error);
    }
  }

  static async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PoliceAgentModel.findByPk(req.params.id);
      if (response) {
        await response.destroy();
        res.status(200).json(<IServerResponse>{
          status: 200,
          message: "Agent Deleted !",
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

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validLogin = validate_login(req.body);
      if (validLogin.error) {
        throw new httpError.Forbidden(validLogin.error.details[0].message);
      }
      const response = await PoliceAgentModel.findOne({
        where: { email: req.body.email },
      });
      if (response) {
        const matched = await bcrypt.compare(
          req.body.password,
          response.dataValues.password
        );
        if (matched) {
          let token = jwt.sign(
            // Payload that will be returned when verifying the token
            {
              id: response.dataValues._id,
              email: response.dataValues.email,
            },
            TOKEN_SECRET as string,
            {
              expiresIn: TOKEN_EXPIRES_IN,
            }
          );
          res.status(200).json(<IServerResponse>{
            status: 200,
            message: "Logged in successfully !",
            data: { token, ...response.dataValues },
            error: null,
          });
        } else {
          throw new httpError.Unauthorized();
        }
      } else {
        throw new httpError.NotFound();
      }
    } catch (error) {
      next(error);
    }
  }
}
