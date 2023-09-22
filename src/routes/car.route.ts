import express, { Router } from "express";
import PoliceAgent from "../controllers/policeAgent.controller";
import verifyToken from "../middlewares/verifyToken";
import Car from "../controllers/car.controller";

const carRoute: express.Router = Router();

carRoute.get("/:id", verifyToken, Car.getOne);
carRoute.put("/:id", verifyToken, Car.updateOne);
carRoute.delete("/:id", verifyToken, Car.deleteOne);
carRoute.post("/new", verifyToken, Car.add);
carRoute.get("/", verifyToken, Car.getAll);

export default carRoute;
