import express, { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import CarPinkCard from "../controllers/carPinkCard.controller";

const carPinkCardRoute: express.Router = Router();

carPinkCardRoute.get("/:id", verifyToken, CarPinkCard.getOne);
carPinkCardRoute.put("/:id", verifyToken, CarPinkCard.updateOne);
carPinkCardRoute.delete("/:id", verifyToken, CarPinkCard.deleteOne);
carPinkCardRoute.post("/new", verifyToken, CarPinkCard.add);
carPinkCardRoute.get("/", verifyToken, CarPinkCard.getAll);

export default carPinkCardRoute;
