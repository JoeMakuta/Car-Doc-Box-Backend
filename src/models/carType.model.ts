import { DataTypes } from "sequelize";
import { sequelize } from "../db";

const CarTypeModel = sequelize.define(
  "CarTypeModel",
  {
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    typeName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "CarType",
  }
);

export default CarTypeModel;
