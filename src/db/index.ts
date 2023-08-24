import { Sequelize, DataTypes } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

// dotenv.config({path : __dirname + `/../../.env.${process.env.NODE_ENV}`})

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_URI, DB_HOST } = process.env;

export const sequelize: Sequelize = new Sequelize(DB_URI as string, {
  host: DB_HOST,
  dialect: "postgres",
});

import "../models/index.model";
import PoliceAgentModel from "../models/policeAgent.model";
import PoliceAgent from "../controllers/policeAgent.controller";

const dbconnexion = async () => {
  try {
    const res = await sequelize.sync();
    const users = await PoliceAgentModel.findAll();
    if (users[0]) {
      console.log("The default user already exists !");
    } else {
      await PoliceAgent.addDefaultUser();
    }
    console.log("Successfull Db Sync and Connexion !");
  } catch (error: any) {
    console.log("DB Connexion failed!", error?.message);
  }
};

export default dbconnexion;
