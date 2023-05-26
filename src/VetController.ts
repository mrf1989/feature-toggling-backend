import express from "express";
import { VetAdscription } from "./model/VetAdscription";
import { db as USERS } from "./UserController";

let vetCounter = 0;
let dateCounter = 0;
let db: VetAdscription[] = [
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

VetController.put("/", (req, res) => {
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

VetController.post("/", (req, res) => {
  const vetId = parseInt(req.body.vetId);
  const customerId = parseInt(req.body.customerId);
  
  if (!vetId || !customerId) {
    res.status(400).send("Missing required fields");
    return;
  }
  
  const vetAdscription = db.find(adscription =>
    adscription.vetId == vetId && adscription.customerId == customerId);
    
  if (vetAdscription) {
    res.status(409).send("Vet already assigned to customer");
  } else {
    db.push({
      id: ++vetCounter,
      vetId: vetId,
      customerId: customerId,
      dates: []
    });
    USERS[customerId-1].vets = USERS[customerId-1].vets + 1;
    res.sendStatus(200);
  }
});

VetController.delete("/customer/:customerId/vet/:vetId", (req, res) => {
  const customerId: number = parseInt(req.params.customerId);
  const vetId: number = parseInt(req.params.vetId);
  const adscription = db.find(adscription =>
    adscription.vetId == vetId && adscription.customerId == customerId);

  if (!adscription) {
    res.status(404).send("Vet not found");
    return;
  }

  const adscriptionDatesSize = adscription.dates.length;
  const id = adscription.id;
  USERS[adscription.customerId-1].dates = USERS[adscription.customerId-1].dates - adscriptionDatesSize;
  USERS[adscription.customerId-1].vets = USERS[adscription.customerId-1].vets - 1;
  db = db.filter(adscription => adscription.id != id);
  res.status(200).send(adscription);
});

export default VetController;