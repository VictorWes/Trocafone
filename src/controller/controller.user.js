import newUser from "../service/service.user.js";
import findAllUsers from "../service/service.user.js";
import renameUser from "../service/service.user.js";

const createUserController = async (req, res) => {
  let { name, username, email, password } = req.body;

  try {
    if (!name || !username || !email || !password) {
      res.status(400).send("Por favor preencha todos os campos ");
    }

    const createUser = await newUser.newUser(req.body);

    res.status(200).send({ message: "Usuario criado com sucesso", createUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const findAllUsersController = async (req, res) => {
  try {
    const findUsers = await findAllUsers.findAllUsers();

    res.status(200).send(findUsers);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const findByIdController = async (req, res) => {
  try {
    const findIdUser = req.user;

    res.status(200).send(findIdUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const renameController = async (req, res) => {
  try {
    let id = req.params.id;

    const findIdForRename = req.user;

    let { name, username, email, password } = req.body;

    if (!name && !username && !email && !password) {
      res.status(400).send("Necessario preencher um dos campos");
    }

    await renameUser.renameUser(id, name, username, email, password);

    res.status(200).send("Usuario Atualizdao com sucesso");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export default {
  createUserController,
  findAllUsersController,
  findByIdController,
  renameController,
};
