import express, { Router } from "express";
import PoliceAgent from "../controllers/policeAgent.controller";

const adminRoute: express.Router = Router();

adminRoute.get("/", PoliceAgent.getAll);
adminRoute.post("/signup", PoliceAgent.add);

export default adminRoute;
