import mongoose from "mongoose";
import findById from "../service/service.user.js";
import findAllNewsByUser from "../service/service.anucio.js";
const validId = (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "ID não é valido" });
    }
    next();
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await findById.findById(id);

    if (!user) {
      return res.status(400).send({ message: "Usario não localizado" });
    }

    req.id = id;
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const quantidadeAnuciosPostados = async (req, res, next) => {
  //Colocar no perfil da pessoa a quantidade de anucios que já postou
  try {
    let { id } = req.params;
    const findAnucioByUser = await findAllNewsByUser.findAllNewsByUser(id);

    let qteAnucios = findAnucioByUser.length;

    if (qteAnucios <= 9) {
      console.log("Novato");
    }
    if (qteAnucios >= 10 && qteAnucios <= 14) {
      console.log("Intermediario");
    } else {
      if (qteAnucios > 15) {
        console.log("Veterano");
      }
    }

    return next();
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
export { validId, validUser, quantidadeAnuciosPostados };
