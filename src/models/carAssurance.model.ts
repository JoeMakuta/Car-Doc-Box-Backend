import { DataTypes } from "sequelize";
import { sequelize } from "../db";

const CarAssuranceModel = sequelize.define(
  "CarAssuranceModel",
  {
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    assurance: {
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
  },
  {
    timestamps: true,
    tableName: "CarAssurance",
  }
);

export default CarAssuranceModel;
