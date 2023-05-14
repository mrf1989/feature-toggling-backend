import express from "express";
import { InputPet, OutputPet } from "./model/Pet";
import { db as USERS } from "./UserController";

const PET_CATEGORIES = {
  1: { id: 1, name: "Dog" },
  2: { id: 2, name: "Cat" },
  3: { id: 3, name: "Bird" },
  4: { id: 4, name: "Reptile" },
  5: { id: 5, name: "Rodent" },
  6: { id: 6, name: "Horse" },
  7: { id: 7, name: "Fish" },
};

let petCounter = 0;
let historyCounter = 0;

const PETS: { [key: number]: OutputPet } = {
  [++petCounter]: {
    id: petCounter,
    name: "Coco",
    birth: "May 2021",
    category: PET_CATEGORIES[1],
    inHostal: false,
    race: "Retriever",
    photo: "https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg",
    owner: 2
  },
  [++petCounter]: {
    id: petCounter,
    name: "Michis",
    birth: "Jul 2017",
    category: PET_CATEGORIES[2],
    inHostal: false,
    race: "Common European",
    photo: "https://www.thesprucepets.com/thmb/r6z0a3Yj2CKbxYtS-Rz5YESGwBQ=/420x294/filters:no_upscale():strip_icc()/GettyImages-1185181003-b2f9c48e81304d10b93f55be4090d788.jpg",
    history: [
      {
        id: ++historyCounter,
        date: "13/01/2023",
        comments: "Lorem ipsun..."
      }
    ],
    owner: 4,
  },
  [++petCounter]: {
    id: petCounter,
    name: "Leon",
    birth: "Jun 2016",
    category: PET_CATEGORIES[2],
    inHostal: false,
    race: "Common European",
    owner: 1
  },
  [++petCounter]: {
    id: petCounter,
    name: "Rufus",
    birth: "Nov 2013",
    category: PET_CATEGORIES[1],
    inHostal: false,
    race: "American Bulldog",
    photo: "https://www.akc.org/wp-content/uploads/2020/01/American-Bulldog-standing-in-three-quarter-view.jpg",
    owner: 3
  },
  [++petCounter]: {
    id: petCounter,
    name: "Konan",
    birth: "May 2014",
    category: PET_CATEGORIES[1],
    inHostal: false,
    race: "Mastiff",
    photo: "https://www.akc.org/wp-content/uploads/2009/01/Neapolitan-Mastiff-on-lead-standing-in-the-grass-outdoors.20190813025752970.jpg",
    owner: 3
  },
  [++petCounter]: {
    id: petCounter,
    name: "Sthela",
    birth: "Feb 2019",
    category: PET_CATEGORIES[2],
    inHostal: false,
    race: "Munchkin",
    owner: 3
  },
};

// Express router controller
const PetController = express.Router();

PetController.post("/", (req, res) => {
  const pet = req.body as InputPet;
  // Validate
  if (
    !pet.name ||
    !pet.birth ||
    !pet.category ||
    !pet.owner ||
    !PET_CATEGORIES[pet.category.id]
  ) {
    res.status(400).send("Missing required fields");
    return;
  }
  PETS[++petCounter] = { ...pet, category: PET_CATEGORIES[pet.category.id] };
  USERS[pet.owner-1].pets = USERS[pet.owner-1].pets + 1;
  res.send(pet);
});

PetController.put("/", (req, res) => {
  // Update pet
  const pet = req.body as InputPet & { id: number };
  if (!pet.id) {
    res.status(400).send("Missing required fields");
    return;
  }
  if (!PETS[pet.id]) {
    res.status(404).send("Pet not found");
    return;
  }

  if (pet.category) {
    if (!PET_CATEGORIES[pet.category.id]) {
      res.status(400).send("Invalid category");
      return;
    }
  }
  PETS[pet.id] = {
    ...PETS[pet.id],
    ...pet,
    ...(pet.category && { category: PET_CATEGORIES[pet.category.id] }),
  };
  res.sendStatus(200);
});

PetController.get("/list", (req, res) => {
  // Map pets object to list of pets with id property using Object.entries
  const pets = Object.entries(PETS).map(([id, pet]) => ({ ...pet, id }));
  res.send(pets);
});

PetController.get("/category/list", (req, res) => {
  const cats = Object.values(PET_CATEGORIES);
  res.send(cats);
});

PetController.get("/:petId", (req, res) => {
  const petId = req.params.petId;
  if (!PETS[petId]) {
    res.status(404).send("Pet not found");
    return;
  }
  res.send(PETS[petId]);
});

PetController.delete("/:petId", (req, res) => {
  const petId = req.params.petId;
  if (!PETS[petId]) {
    res.status(404).send("Pet not found");
    return;
  }
  delete PETS[petId];
  res.sendStatus(200);
});

PetController.get("/owner/:id", (req, res) => {
  const petsCollection = Object.values(PETS);
  const id = req.params.id;
  const pets = petsCollection.filter(pet => pet.owner === Number(id));
  res.send(pets);
});

export default PetController;
