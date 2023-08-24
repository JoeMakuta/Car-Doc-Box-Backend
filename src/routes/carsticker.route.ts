import express, { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import CarAssurance from "../controllers/carAssurance.controller";
import CarSticker from "../controllers/carSticker.controller";

const carStickerRoute: express.Router = Router();

carStickerRoute.get("/:id", verifyToken, CarSticker.getOne);
carStickerRoute.put("/:id", verifyToken, CarSticker.updateOne);
carStickerRoute.delete("/:id", verifyToken, CarSticker.deleteOne);
carStickerRoute.post("/new", CarSticker.add);
carStickerRoute.get("/", CarSticker.getAll);

export default carStickerRoute;
