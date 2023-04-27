import createAnucioService from "../service/service.anucio.js";
import findAnucioService from "../service/service.anucio.js";
import findUniqueAnucioService from "../service/service.anucio.js";
import findAllNewsByUser from "../service/service.anucio.js";
import countAnucios from "../service/service.anucio.js";
const createAnucioController = async (req, res) => {
  try {
    let { modelPhone, usageTime, numeroParaContato, valorPhoneTrocaPor } =
      req.body;

    if (
      !modelPhone ||
      !usageTime ||
      !numeroParaContato ||
      !valorPhoneTrocaPor
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
      user: req.userId,
    });

    res.status(200).send("Anucio criado com sucesso!");
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const findAnucioController = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }
    const findallAnucios = await findAnucioService.findAnucioService(
      limit,
      offset
    );
    const total = await countAnucios.countAnucios();
    const curretUrl = req.baseUrl;

    const next = limit + offset;

    const nextUrl =
      next < total ? `${curretUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${curretUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (findallAnucios.length === 0) {
      return res
        .status(400)
        .send({ message: "Não existe anucios a serem mostrados" });
    }

    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      result: findallAnucios.map(item => ({
        idnews: item._id,
        modelPhone: item.modelPhone,
        usageTime: item.usageTime,
        numeroParaContato: item.numeroParaContato,
        valorPhoneTrocaPor: item.valorPhoneTrocaPor,
        name: item.user.name,
        email: item.user.email,
        userId: item.user._id,
      }))


    })

    res.status(200).send();
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
        usageTime: findUnique.usageTime,
        numeroParaContato: findUnique.numeroParaContato,
        valorPhoneTrocaPor: findUnique.valorPhoneTrocaPor,
        name: findUnique.user.name,
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

    let countAnucio =  res.send({
      result: findAnucioByUser.map((item) => ({
        idnews: item._id,
        modelPhone: item.modelPhone,
        usageTime: item.usageTime,
        numeroParaContato: item.numeroParaContato,
        valorPhoneTrocaPor: item.valorPhoneTrocaPor,
        name: item.user.name,
        email: item.user.email,
        userId: item.user._id,
      })),
    });
  
    return countAnucio
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};


export default {
  createAnucioController,
  findAnucioController,
  findUniqueAnucioController,
  findAllNewsByUserController,
};
