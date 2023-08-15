import express from "express";
import * as http from "http";
import * as dotenv from "dotenv";
import homeRoute from "./routes/home.route";
import ExpressError from "./middlewares/error";
import NotFoundError from "./middlewares/notFound";
import dbconnexion, { sequelize } from "./db";
import adminRoute from "./routes/admin.route";

dotenv.config();

export default class App {
  app: express.Application = express();
  server: http.Server = http.createServer(this.app);
  public async init() {
    await dbconnexion();
    this.middlewares();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use("/api", homeRoute);
    this.app.use(NotFoundError.errorHandler);
    this.app.use(ExpressError.errorHandler);
  }
}
