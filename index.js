import express from "express";
import database from "./src/database/database.js";
import routerUser from "./src/routes/route.user.js";
import routerAuth from "./src/routes/router.auth.js";

const api = express();
database();
const port = 8000;
api.use(express.json());

api.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

api.use("/login", routerAuth);

api.use("/renameuser", routerUser);
api.use("/create", routerUser);
api.use("/users", routerUser);
api.use("/findbyid", routerUser);
