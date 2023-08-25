import express, { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import CarAssurance from "../controllers/carAssurance.controller";

const carAssuranceRoute: express.Router = Router();

carAssuranceRoute.get("/:id", verifyToken, CarAssurance.getOne);
carAssuranceRoute.put("/:id", verifyToken, CarAssurance.updateOne);
carAssuranceRoute.delete("/:id", verifyToken, CarAssurance.deleteOne);
carAssuranceRoute.post("/new", verifyToken, CarAssurance.add);
carAssuranceRoute.get("/", verifyToken, CarAssurance.getAll);

export default carAssuranceRoute;
