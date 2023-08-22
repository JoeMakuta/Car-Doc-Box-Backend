import express, { Router } from "express";
import CarPlate from "../controllers/carPlate.controller";
import verifyToken from "../middlewares/verifyToken";

const carPlateRoute: express.Router = Router();

carPlateRoute.get("/:id", verifyToken, CarPlate.getOne);
carPlateRoute.put("/:id", verifyToken, CarPlate.updateOne);
carPlateRoute.delete("/:id", verifyToken, CarPlate.deleteOne);
carPlateRoute.post("/new", CarPlate.add);
carPlateRoute.get("/", CarPlate.getAll);

export default carPlateRoute;
