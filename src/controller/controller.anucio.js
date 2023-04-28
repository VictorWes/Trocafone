import createAnucioService from "../service/service.anucio.js";
import findAnucioService from "../service/service.anucio.js";
import findUniqueAnucioService from "../service/service.anucio.js";
import findAllNewsByUser from "../service/service.anucio.js";
import searchByTitleService from "../service/service.anucio.js";
import findAllAnucioByCityService from "../service/service.anucio.js";
import upadteAnucioService from "../service/service.anucio.js";

const createAnucioController = async (req, res) => {
  try {
    let { modelPhone, usageTime, numeroParaContato, valorPhoneTrocaPor, city } =
      req.body;

    if (
      !modelPhone ||
      !usageTime ||
      !numeroParaContato ||
      !valorPhoneTrocaPor ||
      !city
    ) {
      return res.status(400).send({
        message: "Necessario enviar todos os campos para criar um anucio",
      });
    }

    const novoAnucio = await createAnucioService.createAnucioService({
      modelPhone,
      usageTime,
      numeroParaContato,
      valorPhoneTrocaPor,
      city,
      user: req.userId,
    });

    return res.status(200).send("Anucio criado com sucesso!");
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const findAnucioController = async (req, res) => {
  try {
    const allAnucios = await findAnucioService.findAnucioService();

    if (allAnucios.length === 0) {
      return res
        .status(400)
        .send({ message: "Não existe anucios a serem mostrados" });
    }

    res.status(200).send(allAnucios);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const findUniqueAnucioController = async (req, res) => {
  try {
    const { id } = req.params;

    const findUnique = await findUniqueAnucioService.findUniqueAnucioService(
      id
    );

    res.send({
      anucio: {
        idnews: findUnique._id,
        modelPhone: findUnique.modelPhone,
        city: findUnique.city,
        usageTime: findUnique.usageTime,
        numeroParaContato: findUnique.numeroParaContato,
        valorPhoneTrocaPor: findUnique.valorPhoneTrocaPor,
        name: findUnique.user.name,
        username: findUnique.user.username,
        email: findUnique.user.email,
        userId: findUnique.user._id,
      },
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const findAllNewsByUserController = async (req, res) => {
  try {
    let { id } = req.params;

    const findAnucioByUser = await findAllNewsByUser.findAllNewsByUser(id);

    let countAnucio = res.send({
      result: findAnucioByUser.map((item) => ({
        idnews: item._id,
        modelPhone: item.modelPhone,
        city: item.city,
        usageTime: item.usageTime,
        numeroParaContato: item.numeroParaContato,
        valorPhoneTrocaPor: item.valorPhoneTrocaPor,
        name: item.user.name,
        email: item.user.email,
        userId: item.user._id,
      })),
    });

    return countAnucio;
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const searchNewsController = async (req, res) => {
  try {
    const { modelPhone } = req.query;

    const findNewsSearch = await searchByTitleService.searchByTitleService(
      modelPhone
    );

    if (findNewsSearch === 0) {
      return res
        .status(400)
        .send({ message: "Não foi possivel localizar nenhuma noticia" });
    }

    res.send({
      result: findNewsSearch.map((item) => ({
        idnews: item._id,
        modelPhone: item.modelPhone,
        city: item.city,
        usageTime: item.usageTime,
        numeroParaContato: item.numeroParaContato,
        valorPhoneTrocaPor: item.valorPhoneTrocaPor,
        name: item.user.name,
        email: item.user.email,
        userId: item.user._id,
      })),
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const findAllAnucioByCityController = async (req, res) => {
  try {
    let { city } = req.query;

    const findAnucioCity =
      await findAllAnucioByCityService.findAllAnucioByCityService(city);

    res.send({
      anucios: findAnucioCity.map((item) => ({
        idnews: item._id,
        modelPhone: item.modelPhone,
        city: item.city,
        usageTime: item.usageTime,
        numeroParaContato: item.numeroParaContato,
        valorPhoneTrocaPor: item.valorPhoneTrocaPor,
        name: item.user.name,
        email: item.user.email,
        userId: item.user._id,
      })),
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const upadteAnucioController = async (req, res) => {
  try {
    let { modelPhone, usageTime, numeroParaContato, valorPhoneTrocaPor, city } =
    req.body;
    
    if (
      !modelPhone &&
      !usageTime &&
      !numeroParaContato &&
      !valorPhoneTrocaPor &&
      !city
    ) {
      res
        .status(400)
        .send({ message: "Por favor preencha pelo menos um dos campos" });
    }

    const id = req.params.id

    const userId = await findUniqueAnucioService.findUniqueAnucioService(id)
     await upadteAnucioService.upadteAnucioService(
      id,
      modelPhone,
      usageTime,
      numeroParaContato,
      valorPhoneTrocaPor,
      city
    );

    res.status(200).send("Anucio atualizado com sucesso");
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
export default {
  createAnucioController,
  findAnucioController,
  findUniqueAnucioController,
  findAllNewsByUserController,
  searchNewsController,
  findAllAnucioByCityController,
  upadteAnucioController
};
