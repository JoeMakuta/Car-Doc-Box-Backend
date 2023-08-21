import express, { Router } from "express";
import PoliceAgent from "../controllers/policeAgent.controller";

const adminRoute: express.Router = Router();

adminRoute.get("/:id", PoliceAgent.getOne);
adminRoute.put("/:id", PoliceAgent.updateOne);
adminRoute.delete("/:id", PoliceAgent.deleteOne);
adminRoute.post("/signup", PoliceAgent.add);
adminRoute.post("/login", PoliceAgent.login);
adminRoute.get("/", PoliceAgent.getAll);

export default adminRoute;
