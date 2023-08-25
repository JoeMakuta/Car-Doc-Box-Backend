import * as express from "express";
import * as jwt from "jsonwebtoken";

export interface ICarOwner {
  _id: string;
  firstName: string;
  lastName: string;
  surName: string;
  gender: "F" | "M";
  email: string;
  phone: string[];
  username: string;
  password: string;
  birthDate: Date;
  photos?: string[];
  address: string[];
  role: 1 | 2 | 3;
  driverLicense: string;
  nationalId: string;
}
