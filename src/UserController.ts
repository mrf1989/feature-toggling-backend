import express from "express";
import { Role, User } from "./model/User";
import { PricingType } from "./model/PricingPlan";

let userCounter = 0;

export const db: User[] = [
  {
    "id": ++userCounter,
    "username": "mruano",
    "password": "1234",
    "pricingType": PricingType.BASIC,
    "pets": 1,
    "vets": 1,
    "dates": 2,
    "role": Role.CUSTOMER
  },
  {
    "id": ++userCounter,
    "username": "csanta17",
    "password": "1234",
    "pricingType": PricingType.ADVANCED,
    "pets": 1,
    "vets": 2,
    "dates": 0,
    "role": Role.CUSTOMER
  },
  {
    "id": ++userCounter,
    "username": "admin",
    "password": "1234",
    "pricingType": PricingType.PRO,
    "pets": 3,
    "vets": 2,
    "dates": 1,
    "role": Role.ADMIN
  },
  {
    "id": ++userCounter,
    "username": "vetdoc1",
    "password": "1234",
    "name": "John Wood",
    "email": "johnclinic@petfriends.com",
    "address": "1512 Marietta Street, Vallejo, CA",
    "pricingType": PricingType.PRO,
    "pets": 0,
    "vets": 0,
    "dates": 0,
    "role": Role.VET
  },
  {
    "id": ++userCounter,
    "username": "vetdoc2",
    "password": "1234",
    "name": "Jennifer Wick",
    "email": "j.wick@dogsandcat.com",
    "address": "1756 Fairway Drive, Vacaville, CA",
    "pricingType": PricingType.PRO,
    "pets": 0,
    "vets": 0,
    "dates": 0,
    "role": Role.VET
  },
  {
    "id": ++userCounter,
    "username": "vetdoc3",
    "password": "1234",
    "name": "Frank Foo",
    "email": "foobuzz@frankfoo.com",
    "address": "675 Roots Street, Fresno, CA",
    "pricingType": PricingType.PRO,
    "pets": 0,
    "vets": 0,
    "dates": 0,
    "role": Role.VET
  },
]

const UserController = express.Router();

UserController.get("/", (req, res) => {
  res.send(db);
});

UserController.get("/:id", (req, res) => {
  const user = db.find(u => u.id === Number(req.params.id));
  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});

UserController.post("/login", (req, res) => {
  const user = db.find(u => u.username === req.body.username);
  if (user.password === req.body.password) {
    res.send(user);
  } else {
    res.sendStatus(401);
  }
});

UserController.put("/:id", (req, res) => {
  const user = db.find(u => u.id === Number(req.params.id));
  if (user) {
    user.pricingType = req.body.pricingType;
    db[db.indexOf(user)] = user;
    res.send(user)
  } else {
    res.sendStatus(404);
  }
});

export default UserController;