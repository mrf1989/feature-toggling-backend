import express from "express";
import { VetAdscription } from "./model/VetAdscription";

let vetCounter = 0;
const db: VetAdscription[] = [
  {
    id: ++vetCounter,
    vetId: 4,
    customerId: 1,
    dates: []
  },
  {
    id: ++vetCounter,
    vetId: 4,
    customerId: 2,
    dates: []
  },
  {
    id: ++vetCounter,
    vetId: 5,
    customerId: 2,
    dates: []
  }
]


// Express router controller
const VetController = express.Router();

VetController.get("/customer/:id", (req, res) => {
  const id = req.params.id;
  const vets = db.filter(vet => vet.customerId == Number(id));
  res.send(vets);
});

export default VetController;