import express, {Router} from "express"
import PoliceAgent from "../controllers/policeAgent.controller"

const adminRoute : express.Router = Router()

adminRoute.get('/', PoliceAgent.home )
adminRoute.use('/signup', PoliceAgent.add )

export default adminRoute