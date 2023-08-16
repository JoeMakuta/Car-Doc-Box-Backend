import express, { Router } from "express";
import PoliceAgent from "../controllers/policeAgent.controller";

const adminRoute: express.Router = Router();

adminRoute.get("/", PoliceAgent.home);
adminRoute.post("/signup", PoliceAgent.add);
adminRoute.post("/all", PoliceAgent.getAll);

export default adminRoute;
