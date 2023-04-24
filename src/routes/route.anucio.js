import { Router } from "express";
import createAnucioController from "../controller/controller.anucio.js";
import findAnucioController from "../controller/controller.anucio.js";
import authmiddleware from "../middleware/auth.middleware.js";
import findUniqueAnucioController from "../controller/controller.anucio.js";
import findAllNewsByUserController from "../controller/controller.anucio.js"

const routerAnucio = Router();

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
routerAnucio.get(
  "/find/:id",
  authmiddleware,
  findUniqueAnucioController.findUniqueAnucioController
);

routerAnucio.get("/findall/:id", authmiddleware,findAllNewsByUserController.findAllNewsByUserController)
export default routerAnucio;
