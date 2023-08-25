import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import * as dotenv from "dotenv";
import CarModel from "./car.model";
import CarOwnerModel from "./carOwner.model";

dotenv.config();

const PoliceAgentModel = sequelize.define(
  "PoliceAgentModel",
  {
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surName: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    photos: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    address: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
    policeLicense: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "PoliceAgent",
  }
);

PoliceAgentModel.hasMany(CarModel, {
  onDelete: "CASCADE",
  foreignKey: "adminId",
});

PoliceAgentModel.hasMany(CarOwnerModel, {
  onDelete: "CASCADE",
  foreignKey: "adminId",
});

export default PoliceAgentModel;
