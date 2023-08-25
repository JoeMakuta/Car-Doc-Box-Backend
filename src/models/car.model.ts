import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import CarPlateModel from "./carPlate.model";
import CarAssuranceModel from "./carAssurance.model";
import CarTypeModel from "./carType.model";
import CarStickerModel from "./carSticker.model";
import CarPinkCardModel from "./carPinkCard.model";
import CarTechControlModel from "./carTechControl.model";
import PoliceAgentModel from "./policeAgent.model";

const CarModel = sequelize.define(
  "CarModel",
  {
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    chassisNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    carBrand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photos: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Car",
  }
);

CarAssuranceModel.hasOne(CarModel, {
  onDelete: "CASCADE",
  foreignKey: "CarAssuranceId",
});

CarPlateModel.hasOne(CarModel, {
  onDelete: "CASCADE",
  foreignKey: "CarPlateId",
});

CarStickerModel.hasOne(CarModel, {
  onDelete: "CASCADE",
  foreignKey: "CarStickerId",
});
CarPinkCardModel.hasOne(CarModel, {
  onDelete: "CASCADE",
  foreignKey: "CarPinkCardId",
});
CarTechControlModel.hasOne(CarModel, {
  onDelete: "CASCADE",
  foreignKey: "CarTechControlId",
});
CarTypeModel.hasMany(CarModel, {
  onDelete: "CASCADE",
  foreignKey: "CarTypeId",
});

export default CarModel;
