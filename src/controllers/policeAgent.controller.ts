import express from 'express'
import {Request, Response, NextFunction} from "express"
import httpError , {HttpError} from 'http-errors'
import PoliceAgentModel from '../models/policeAgent.model'

export default class PoliceAgent{
   static async home(req : Request, res : Response, next : NextFunction){
      res.json(<IServerResponse>{status:200, data: null, message: "Police Agent : Home", error:null})
      // const {} = req.body
      // await PoliceAgentModel.create({

      // })
   }
   static async add(req : Request, res : Response, next : NextFunction){
      res.json(<IServerResponse>{status:200, data: null, message: "Police Agent : Add", error:null})
      // const {} = req.body
      // await PoliceAgentModel.create({

      // })
   }
}