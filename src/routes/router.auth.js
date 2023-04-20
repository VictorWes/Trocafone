import { Router } from "express";
import { login } from "../controller/controller.auth.js";
import authmiddleware from "../middleware/auth.middleware.js";

const routerAuth = Router();

routerAuth.post("/", login);
export default routerAuth;
