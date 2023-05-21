import express from "express";
import { VetAdscription } from "./model/VetAdscription";
import { db as USERS } from "./UserController";

let vetCounter = 0;
let dateCounter = 0;
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

const VetController = express.Router();

VetController.get("/customer/:id", (req, res) => {
  const id = req.params.id;
  const vets = db.filter(vet => vet.customerId == Number(id));
  res.send(vets);
});

VetController.post("/", (req, res) => {
  const vetId = req.body.vetId;
  const customerId = req.body.customerId;
  
  if (!vetId || !customerId) {
    res.status(400).send("Missing required fields");
    return;
  }
  
  const vetAdscription = db.find(adscription => 
    adscription.vetId == vetId && adscription.customerId == customerId);
    
  if (vetAdscription) {
    db[vetAdscription.id-1].dates.push({
      id: ++dateCounter,
      date: new Date().toISOString(),
    });

    USERS[vetAdscription.customerId-1].dates = USERS[vetAdscription.customerId-1].dates + 1;
    res.sendStatus(200);
  } else {  
    res.status(404).send("Vet not found");
  }
});

export default VetController;