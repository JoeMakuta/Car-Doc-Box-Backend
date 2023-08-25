import express, { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import CarAssurance from "../controllers/carAssurance.controller";
import CarSticker from "../controllers/carSticker.controller";
import CarTechControl from "../controllers/carTechControl.controller";

const carTechControlRoute: express.Router = Router();

carTechControlRoute.get("/:id", verifyToken, CarTechControl.getOne);
carTechControlRoute.put("/:id", verifyToken, CarTechControl.updateOne);
carTechControlRoute.delete("/:id", verifyToken, CarTechControl.deleteOne);
carTechControlRoute.post("/new", CarTechControl.add);
carTechControlRoute.get("/", CarTechControl.getAll);

export default carTechControlRoute;
