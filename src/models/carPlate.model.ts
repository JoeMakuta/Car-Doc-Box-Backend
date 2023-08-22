import { DataTypes } from "sequelize";
import { sequelize } from "../db";

const CarPlateModel = sequelize.define(
  "CarPlateModel",
  {
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    plateNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "CarPlate",
  }
);

export default CarPlateModel;
