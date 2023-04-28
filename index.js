import express from "express";
import database from "./src/database/database.js";
import routerUser from "./src/routes/route.user.js";
import routerAuth from "./src/routes/router.auth.js";
import routerAnucio from "./src/routes/route.anucio.js";
import dotenv from "dotenv";

dotenv.config();
const api = express();
database();
const port = process.env.PORT || 8000;
api.use(express.json());

api.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

api.use("/login", routerAuth);

api.use("/renameuser", routerUser);
api.use("/create", routerUser);
api.use("/users", routerUser);
api.use("/findbyid", routerUser);


api.use("/findallanucio", routerAnucio)
api.use("/search", routerAnucio);
api.use("/create", routerAnucio);
api.use("/anucios", routerAnucio);
api.use("/anucio", routerAnucio);
api.use("/anuciosid", routerAnucio);
api.use("/update", routerAnucio)
