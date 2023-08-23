import express, { Router } from "express";
import PoliceAgent from "../controllers/policeAgent.controller";
import verifyToken from "../middlewares/verifyToken";
import Car from "../controllers/car.controller";

const carRoute: express.Router = Router();

carRoute.get("/:id", Car.getOne);
carRoute.put("/:id", Car.updateOne);
carRoute.delete("/:id", Car.deleteOne);
carRoute.post("/new", Car.add);
carRoute.get("/", Car.getAll);

export default carRoute;
