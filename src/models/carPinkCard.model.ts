import { DataTypes } from "sequelize";
import { sequelize } from "../db";

const CarPinkCardModel = sequelize.define(
  "CarPinkCardModel",
  {
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    pinkCard: {
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
    tableName: "CarPinkCard",
  }
);

export default CarPinkCardModel;
