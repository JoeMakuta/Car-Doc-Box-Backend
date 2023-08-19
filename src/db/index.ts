import { Sequelize, DataTypes } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

// dotenv.config({path : __dirname + `/../../.env.${process.env.NODE_ENV}`})

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_URI, DB_HOST } = process.env;

export const sequelize: Sequelize = new Sequelize(DB_URI as string, {
  host: DB_HOST,
  dialect: "postgres",
});

import "../models/policeAgent.model";

const dbconnexion = async () => {
  try {
    await sequelize
      .sync()
      .then((res) => console.log("Successfull Db Sync and Connexion !"));
  } catch (error: any) {
    console.log("DB Connexion failed!", error?.message);
  }
};

export default dbconnexion;
