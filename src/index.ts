import express from "express";
import PetController from "./PetController";
import PrincingController from "./PricingController";
import UserController from "./UserController";
import VetController from "./VetController";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use("/api/pet", PetController);
app.use("/api/pricing", PrincingController);
app.use("/api/user", UserController);
app.use("/api/vet", VetController);

(async () => {
  app.listen(4000, async () => {
    console.log("Example app listening on port 4000!");
  });
})();
