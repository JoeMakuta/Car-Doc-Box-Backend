import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { TOKEN_SECRET } = process.env;
  try {
    const token: string = req.headers.authorization?.split(" ")[1] as string;
    const payLoad = jwt.verify(token, TOKEN_SECRET);
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
