import express from "express";
import { PricingPlan, PricingType } from "./model/PricingPlan";

const db: PricingPlan[] = [
  {
    "type": PricingType.BASIC,
    "nVets": 1,
    "nPets": 1,
    "nDates": 2,
    "veterinarySpecialities": ["cats", "dogs"],
    "advProfile": true,
    "vetHistory": false,
    "adoptionSys": false,
    "petHostel": false,
    "cost": 0
  },
  {
    "type": PricingType.ADVANCED,
    "nVets": 2,
    "nPets": 3,
    "nDates": 5,
    "veterinarySpecialities": ["all"],
    "advProfile": true,
    "vetHistory": true,
    "adoptionSys": true,
    "petHostel": false,
    "cost": 9.95
  },
  {
    "type": PricingType.PRO,
    "nVets": 5,
    "nPets": 5,
    "nDates": 10,
    "veterinarySpecialities": ["all"],
    "advProfile": true,
    "vetHistory": true,
    "adoptionSys": true,
    "petHostel": true,
    "cost": 14.95
  }
]

const PrincingController = express.Router();

PrincingController.get("/", (req, res) => {
  res.send(db);
});

PrincingController.get("/:type", (req, res) => {
  const princing = db.find(p => p.type === req.params.type.toUpperCase());
  if (princing) {
    res.send(princing);
  } else {
    res.status(404).send("Pricing not found");
  }
});

PrincingController.put("/:type", (req, res) => {
  const index = db.indexOf(db.find(p => p.type === req.params.type.toUpperCase()));
  const updatedPricing = req.body as PricingPlan;
  db[index] = updatedPricing;
  res.sendStatus(200);
});

export default PrincingController;