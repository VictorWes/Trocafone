import mongoose from "mongoose";
import findById from "../service/service.user.js";
const validId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "ID não é valido" });
  }
  next();
};

const validUser = async (req, res, next) => {
  const id = req.params.id;

  const user = await findById.findById(id);

  if (!user) {
    return res.status(400).send({ message: "Usario não localizado" });
  }

  req.id = id;
  req.user = user;
  next();
};

export { validId, validUser };
