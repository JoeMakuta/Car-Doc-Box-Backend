import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import CarOwnerModel from "./carOwner.model";

const DriverLicenseModel = sequelize.define(
  "DriverLicenseModel",
  {
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    driverLicense: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    photos: {
      type: DataTypes.JSON,
    },
  },
  {
    timestamps: true,
    tableName: "DriverLicense",
  }
);

DriverLicenseModel.hasOne(CarOwnerModel);

export default DriverLicenseModel;
