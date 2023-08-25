import express, { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import CarAssurance from "../controllers/carAssurance.controller";
import CarSticker from "../controllers/carSticker.controller";
import CarTechControl from "../controllers/carTechControl.controller";
import DriverLicense from "../controllers/driverLicense.controller";

const driverLicenseRoute: express.Router = Router();

driverLicenseRoute.get("/:id", verifyToken, DriverLicense.getOne);
driverLicenseRoute.put("/:id", verifyToken, DriverLicense.updateOne);
driverLicenseRoute.delete("/:id", verifyToken, DriverLicense.deleteOne);
driverLicenseRoute.post("/new", verifyToken, DriverLicense.add);
driverLicenseRoute.get("/", verifyToken, DriverLicense.getAll);

export default driverLicenseRoute;
