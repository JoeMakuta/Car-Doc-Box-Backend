import express, { Router } from "express";
import PoliceAgent from "../controllers/policeAgent.controller";
import verifyToken from "../middlewares/verifyToken";
import CarOwner from "../controllers/carOwner.controller";

const carOwnerRoute: express.Router = Router();

carOwnerRoute.get("/:id", verifyToken, CarOwner.getOne);
carOwnerRoute.put("/:id", verifyToken, CarOwner.updateOne);
carOwnerRoute.delete("/:id", verifyToken, CarOwner.deleteOne);
carOwnerRoute.post("/add", verifyToken, CarOwner.add);
carOwnerRoute.get("/", verifyToken, CarOwner.getAll);

export default carOwnerRoute;
