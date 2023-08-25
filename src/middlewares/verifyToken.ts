import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUserRequest } from "../@types/user.type";
import PoliceAgentModel from "../models/policeAgent.model";
import * as httpError from "http-errors";
import { Model } from "sequelize";

const verifyToken = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { TOKEN_SECRET } = process.env;
  try {
    const token: string = req.headers.authorization?.split(" ")[1] as string;
    const payLoad = jwt.verify(token, TOKEN_SECRET as string);

    const user: Model<any, any> | null = await PoliceAgentModel.findByPk(
      payLoad.id
    );
    if (user) {
      req.auth = user;
      next();
    } else throw new httpError.NotFound("The admin does not exist !");
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
