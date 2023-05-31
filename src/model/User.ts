import { PricingType } from "./PricingPlan";

export interface User {
  id: number,
  username: string,
  password: string,
  email?: string,
  address?: string,
  name?: string,
  pricingType: PricingType
  pets: number,
  vets: number,
  dates: number,
  photo: string,
  role: Role,
}

export enum Role {
  ADMIN = "ADMIN",
  VET = "VET",
  CUSTOMER = "CUSTOMER"
}