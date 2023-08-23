import express, { Router } from "express";
import CarPlate from "../controllers/carPlate.controller";
import verifyToken from "../middlewares/verifyToken";
import CarType from "../controllers/carType.controller";

const carTypeRoute: express.Router = Router();

carTypeRoute.get("/:id", verifyToken, CarType.getOne);
carTypeRoute.put("/:id", verifyToken, CarType.updateOne);
carTypeRoute.delete("/:id", verifyToken, CarType.deleteOne);
carTypeRoute.post("/new", CarType.add);
carTypeRoute.get("/", CarType.getAll);

export default carTypeRoute;
