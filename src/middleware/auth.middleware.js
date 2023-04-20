import jwt from "jsonwebtoken";
import findById from "../service/service.user.js";

const authmiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.send(401);
    }

    const parts = authorization.split(" ");

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.send(401);
    }

    jwt.verify(
      token,
      "2f4fda8e8658c41a6fc7022d29024179",
      async (error, decoded) => {
        if (error) {
          return res.status(401).send({ message: "Token invalido" });
        }

        const user = await findById.findById(decoded.id);

        if (!user || !user.id) {
          return res.status(401).send({ message: "Invalid token" });
        }

        req.userId = user.id;

        return next();
      }
    );
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
export default authmiddleware;
