import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUserRequest } from "../@types/user.type";
import * as httpError from "http-errors";

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { TOKEN_SECRET } = process.env;
  try {
    const token: string = req.headers.authorization?.split(" ")[1] as string;
    const payLoad = jwt.verify(token, TOKEN_SECRET as string);
    // req.auth = payLoad;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
