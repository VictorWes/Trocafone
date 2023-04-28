import { Router } from "express";
import createAnucioController from "../controller/controller.anucio.js";
import findAnucioController from "../controller/controller.anucio.js";
import authmiddleware from "../middleware/auth.middleware.js";
import findUniqueAnucioController from "../controller/controller.anucio.js";
import findAllNewsByUserController from "../controller/controller.anucio.js";
import { quantidadeAnuciosPostados, validId, validUser } from "../middleware/global.middleware.js";
import searchNewsController from "../controller/controller.anucio.js";
import findAllAnucioByCityController from "../controller/controller.anucio.js"
import upadteAnucioController from "../controller/controller.anucio.js"

const routerAnucio = Router();

routerAnucio.patch("/:id", authmiddleware, upadteAnucioController.upadteAnucioController)
routerAnucio.get(
  "/anucio",
  authmiddleware,
  searchNewsController.searchNewsController
);
routerAnucio.post(
  "/anucio",
  authmiddleware,
  createAnucioController.createAnucioController
);
routerAnucio.get(
  "/findall",
  authmiddleware,
  findAnucioController.findAnucioController
);

routerAnucio.get("/city", authmiddleware,findAllAnucioByCityController.findAllAnucioByCityController)



routerAnucio.get(
  "/find/:id",
  authmiddleware,
  findUniqueAnucioController.findUniqueAnucioController
);

routerAnucio.get(
  "/findall/:id",
  authmiddleware,
  quantidadeAnuciosPostados,
  findAllNewsByUserController.findAllNewsByUserController
);
export default routerAnucio;
