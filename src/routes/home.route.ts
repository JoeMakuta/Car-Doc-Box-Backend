import { Router } from "express";
import { Home } from "../controllers/home";
import express from "express";
import adminRoute from "./admin.route";
import carPlateRoute from "./carplate.route";
import verifyToken from "../middlewares/verifyToken";
import carTypeRoute from "./cartype.route";
import carAssuranceRoute from "./carassurance.route";
import carRoute from "./car.route";
import carOwnerRoute from "./carowner.route";

const homeRoute: express.Router = Router();

homeRoute.get("/", Home);
homeRoute.use("/carplate", verifyToken, carPlateRoute);
homeRoute.use("/cartype", verifyToken, carTypeRoute);
homeRoute.use("/carassurance", verifyToken, carAssuranceRoute);
homeRoute.use("/car", verifyToken, carRoute);
homeRoute.use("/carowner", verifyToken, carOwnerRoute);
homeRoute.use("/admin", adminRoute);

export default homeRoute;
