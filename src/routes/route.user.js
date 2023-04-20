import { Router } from "express";
import createUserController from "../controller/controller.user.js";
import findAllUsersController from "../controller/controller.user.js";
import findByIdController from "../controller/controller.user.js";
import renameController from "../controller/controller.user.js";
import { validId, validUser } from "../middleware/global.middleware.js";
import authmiddleware from "../middleware/auth.middleware.js";
const routerUser = Router();

routerUser.patch(
  "/:id",
  authmiddleware,
  validId,
  validUser,
  renameController.renameController
);
routerUser.post("/user", createUserController.createUserController);
routerUser.get("/findall", findAllUsersController.findAllUsersController);
routerUser.get(
  "/:id",
  validId,
  validUser,
  findByIdController.findByIdController
);

export default routerUser;
