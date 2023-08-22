import express, { Router } from "express";
import PoliceAgent from "../controllers/policeAgent.controller";
import verifyToken from "../middlewares/verifyToken";

const adminRoute: express.Router = Router();

adminRoute.get("/:id", verifyToken, PoliceAgent.getOne);
adminRoute.put("/:id", verifyToken, PoliceAgent.updateOne);
adminRoute.delete("/:id", verifyToken, PoliceAgent.deleteOne);
adminRoute.post("/signup", verifyToken, PoliceAgent.add);
adminRoute.post("/login", PoliceAgent.login);
adminRoute.get("/", verifyToken, PoliceAgent.getAll);

export default adminRoute;
