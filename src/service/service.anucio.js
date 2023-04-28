import registerPhone from "../model/Model.anucio.js";

const searchByTitleService = (modelPhone) =>
  registerPhone
    .find({ modelPhone: { $regex: `${modelPhone || ""}`, $options: "i" } })
    .sort({ _id: -1 })
    .populate("user");
const createAnucioService = (body) => registerPhone.create(body);
const findAnucioService = () =>
  registerPhone.find().sort({ _id: -1 }).populate("user");
const findUniqueAnucioService = (id) =>
  registerPhone.findById(id).populate("user");

const findAllNewsByUser = (id) =>
  registerPhone.find({ user: id }).sort({ _id: -1 }).populate("user");

const findAllAnucioByCityService = (city) =>
  registerPhone.find({ city: { $regex: `${city || ""}`, $options: "i" } });
const upadteAnucioService = (
  id,
  modelPhone,
  usageTime,
  numeroParaContato,
  valorPhoneTrocaPor,
  city
) =>
  registerPhone.findOneAndUpdate(
    { _id: id },
    { modelPhone, usageTime, numeroParaContato, valorPhoneTrocaPor, city }
  );

export default {
  createAnucioService,
  findAnucioService,
  findUniqueAnucioService,
  findAllNewsByUser,
  searchByTitleService,
  findAllAnucioByCityService,
  upadteAnucioService
};
