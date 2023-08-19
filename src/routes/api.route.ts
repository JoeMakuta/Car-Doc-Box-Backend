import { Router } from "express";
import express from "express";
import { HomeApi } from "../controllers/home";

const apiRoute: express.Router = Router();

apiRoute.get("/", HomeApi);

export default apiRoute;
