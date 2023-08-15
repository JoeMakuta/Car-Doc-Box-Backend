import {Router} from 'express'
import { Home } from '../controllers/home'
import express from 'express'
import adminRoute from './admin.route'

const homeRoute : express.Router  = Router()

homeRoute.get("/", Home)
homeRoute.use('/admin', adminRoute)

export default homeRoute